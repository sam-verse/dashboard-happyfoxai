import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Crown, Star, TrendingUp, Users, Activity, Brain, Settings, MessageSquare, BookOpen } from "lucide-react";
import { features, featureMetrics, services } from "@/data/happyfoxData";

const Features = () => {
  const getFeatureTypeIcon = (type: string) => {
    switch (type) {
      case 'premium': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'addon': return <Star className="h-4 w-4 text-purple-600" />;
      default: return <Zap className="h-4 w-4 text-blue-600" />;
    }
  };

  const getFeatureTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'addon': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pro': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'starter': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceIcon = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return <Zap className="h-4 w-4" />;
    
    switch (service.type) {
      case 'ai': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'helpdesk': return <Settings className="h-4 w-4 text-blue-600" />;
      case 'chat': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'knowledge_base': return <BookOpen className="h-4 w-4 text-orange-600" />;
      default: return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service?.display_name || 'Unknown Service';
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.service_id]) {
      acc[feature.service_id] = [];
    }
    acc[feature.service_id].push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Features</h1>
          <p className="text-muted-foreground">
            Detailed analytics for all features across HappyFox services
          </p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {services.length} services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Features</CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {features.filter(f => f.feature_type === 'premium').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((features.filter(f => f.feature_type === 'premium').length / features.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Adoption</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(featureMetrics.reduce((sum, m) => sum + m.adoption_rate, 0) / featureMetrics.length)}%
            </div>
            <p className="text-xs text-green-600">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {featureMetrics.reduce((sum, m) => sum + m.total_events, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-service">By Products</TabsTrigger>
          <TabsTrigger value="adoption">Adoption Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Performance Overview</CardTitle>
              <CardDescription>
                All features ranked by usage and adoption metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureMetrics
                  .sort((a, b) => b.total_events - a.total_events)
                  .map((metric) => {
                    const feature = metric.feature;
                    
                    return (
                      <div key={feature.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getServiceIcon(feature.service_id)}
                              <h3 className="font-semibold">{feature.display_name}</h3>
                              <Badge 
                                variant="outline" 
                                className={getFeatureTypeColor(feature.feature_type)}
                              >
                                {getFeatureTypeIcon(feature.feature_type)}
                                <span className="ml-1 capitalize">{feature.feature_type}</span>
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={getPlanBadgeColor(feature.min_plan)}
                              >
                                {feature.min_plan}+
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {getServiceName(feature.service_id)} • {feature.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Adoption Rate</div>
                            <div className="text-lg font-bold text-primary">{metric.adoption_rate}%</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{metric.total_users}</div>
                            <div className="text-xs text-muted-foreground">Total Users</div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{metric.total_events}</div>
                            <div className="text-xs text-muted-foreground">Total Events</div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">
                              {metric.total_events > 0 ? Math.round(metric.total_events / Math.max(metric.total_users, 1)) : 0}
                            </div>
                            <div className="text-xs text-muted-foreground">Events/User</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Usage Intensity</span>
                            <span>{metric.adoption_rate}%</span>
                          </div>
                          <Progress value={metric.adoption_rate} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-service" className="space-y-4">
          {Object.entries(groupedFeatures).map(([serviceId, serviceFeatures]) => (
            <Card key={serviceId}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getServiceIcon(serviceId)}
                  <CardTitle>{getServiceName(serviceId)}</CardTitle>
                </div>
                <CardDescription>
                  {serviceFeatures.length} features in this Products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {serviceFeatures.map((feature) => {
                    const metric = featureMetrics.find(m => m.feature.id === feature.id);
                    
                    return (
                      <div key={feature.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{feature.display_name}</h4>
                            <p className="text-xs text-muted-foreground">{feature.name}</p>
                          </div>
                          <div className="flex gap-1">
                            <Badge 
                              variant="outline" 
                              className={getFeatureTypeColor(feature.feature_type)}
                            >
                              {feature.feature_type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-bold text-primary">{metric?.total_users || 0}</div>
                            <div className="text-xs text-muted-foreground">Users</div>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-bold text-green-600">{metric?.adoption_rate || 0}%</div>
                            <div className="text-xs text-muted-foreground">Adoption</div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <Badge variant="outline" className={getPlanBadgeColor(feature.min_plan)}>
                            Requires {feature.min_plan}+
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="adoption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Analysis</CardTitle>
              <CardDescription>
                Feature adoption rates and usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* High Adoption Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">High Adoption (80%+)</h3>
                  <div className="grid gap-3">
                    {featureMetrics
                      .filter(m => m.adoption_rate >= 80)
                      .map(metric => (
                        <div key={metric.feature.id} className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-2">
                            {getServiceIcon(metric.feature.service_id)}
                            <span className="font-medium">{metric.feature.display_name}</span>
                            <Badge variant="outline" className={getFeatureTypeColor(metric.feature.feature_type)}>
                              {metric.feature.feature_type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600 dark:text-green-400">{metric.adoption_rate}%</div>
                            <div className="text-xs text-muted-foreground">{metric.total_users} users</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Medium Adoption Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-yellow-600 dark:text-yellow-400">Medium Adoption (40-79%)</h3>
                  <div className="grid gap-3">
                    {featureMetrics
                      .filter(m => m.adoption_rate >= 40 && m.adoption_rate < 80)
                      .map(metric => (
                        <div key={metric.feature.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-center gap-2">
                            {getServiceIcon(metric.feature.service_id)}
                            <span className="font-medium">{metric.feature.display_name}</span>
                            <Badge variant="outline" className={getFeatureTypeColor(metric.feature.feature_type)}>
                              {metric.feature.feature_type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-yellow-600 dark:text-yellow-400">{metric.adoption_rate}%</div>
                            <div className="text-xs text-muted-foreground">{metric.total_users} users</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Low Adoption Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">Low Adoption (&lt;40%)</h3>
                  <div className="grid gap-3">
                  {featureMetrics
                    .filter(m => m.adoption_rate < 40)
                    .map(metric => (
                    <div key={metric.feature.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2">
                      {getServiceIcon(metric.feature.service_id)}
                      <span className="font-medium">{metric.feature.display_name}</span>
                      <Badge variant="outline" className={getFeatureTypeColor(metric.feature.feature_type)}>
                        {metric.feature.feature_type}
                      </Badge>
                      </div>
                      <div className="text-right">
                      <div className="font-bold text-red-600 dark:text-red-400">{metric.adoption_rate}%</div>
                      <div className="text-xs text-muted-foreground">{metric.total_users} users</div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>

                
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Features;

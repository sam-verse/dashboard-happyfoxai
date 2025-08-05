import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layers, Users, Activity, Zap, Brain, MessageSquare, BookOpen, Settings } from "lucide-react";
import { services, serviceMetrics, features } from "@/data/happyfoxData";

const Services = () => {
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'ai': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'helpdesk': return <Settings className="h-5 w-5 text-blue-600" />;
      case 'chat': return <MessageSquare className="h-5 w-5 text-green-600" />;
      case 'knowledge_base': return <BookOpen className="h-5 w-5 text-orange-600" />;
      default: return <Layers className="h-5 w-5 text-gray-600" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'ai': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'helpdesk': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'chat': return 'bg-green-100 text-green-800 border-green-200';
      case 'knowledge_base': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceFeatures = (serviceId: string) => {
    return features.filter(f => f.service_id === serviceId);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Overview of all HappyFox services and their usage metrics
          </p>
        </div>
        <Button>
          <Layers className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">
              {services.filter(s => s.is_active).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serviceMetrics.reduce((sum, metric) => sum + metric.total_users, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serviceMetrics.reduce((sum, metric) => sum + metric.total_events, 0)}
            </div>
            <p className="text-xs text-green-600">
              +18% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {serviceMetrics.map((metric) => {
          const service = metric.service;
          const serviceFeatures = getServiceFeatures(service.id);
          const utilizationRate = Math.round((metric.active_users / Math.max(metric.total_users, 1)) * 100);
          
          return (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getServiceIcon(service.type)}
                    <div>
                      <CardTitle className="text-xl">{service.display_name}</CardTitle>
                      <CardDescription>{service.name}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant="outline" 
                      className={getServiceColor(service.type)}
                    >
                      {service.type}
                    </Badge>
                    <Badge variant={service.is_active ? 'default' : 'destructive'}>
                      {service.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Usage Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{metric.total_users}</div>
                    <div className="text-xs text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{metric.active_users}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metric.total_events}</div>
                    <div className="text-xs text-muted-foreground">Total Events</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{metric.avg_events_per_session}</div>
                    <div className="text-xs text-muted-foreground">Avg Events/Session</div>
                  </div>
                </div>

                {/* Utilization Rate */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>User Engagement</span>
                    <span>{utilizationRate}%</span>
                  </div>
                  <Progress value={utilizationRate} className="h-2" />
                </div>

                {/* Features */}
                <div>
                  <div className="text-sm font-medium mb-2">Features ({serviceFeatures.length}):</div>
                  <div className="flex gap-1 flex-wrap">
                    {serviceFeatures.map(feature => (
                      <Badge 
                        key={feature.id} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {feature.display_name}
                        {feature.feature_type === 'premium' && (
                          <span className="ml-1 text-yellow-600">⭐</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Manage Features
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Service Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of service performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Service</th>
                  <th className="text-center p-3">Type</th>
                  <th className="text-center p-3">Users</th>
                  <th className="text-center p-3">Events</th>
                  <th className="text-center p-3">Features</th>
                  <th className="text-center p-3">Engagement</th>
                  <th className="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceMetrics.map((metric) => {
                  const service = metric.service;
                  const serviceFeatures = getServiceFeatures(service.id);
                  const engagementRate = Math.round((metric.active_users / Math.max(metric.total_users, 1)) * 100);
                  
                  return (
                    <tr key={service.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getServiceIcon(service.type)}
                          <div>
                            <div className="font-medium">{service.display_name}</div>
                            <div className="text-xs text-muted-foreground">{service.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className={getServiceColor(service.type)}>
                          {service.type}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <div className="font-medium">{metric.total_users}</div>
                        <div className="text-xs text-green-600">{metric.active_users} active</div>
                      </td>
                      <td className="p-3 text-center font-medium">{metric.total_events}</td>
                      <td className="p-3 text-center font-medium">{serviceFeatures.length}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center gap-2">
                          <Progress value={engagementRate} className="h-2 flex-1" />
                          <span className="text-xs w-8">{engagementRate}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={service.is_active ? 'default' : 'destructive'}>
                          {service.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;

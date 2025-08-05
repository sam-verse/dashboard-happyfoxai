import { 
  Activity, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Layers, 
  Crown, 
  Brain,
  MessageSquare,
  Settings,
  BookOpen,
  Zap
} from 'lucide-react';
import { MetricsGrid } from '@/components/advanced/MetricsGrid';
import { EventsChart } from '@/components/charts/EventsChart';
import { DeviceChart } from '@/components/charts/DeviceChart';
import { RealTimeChart } from '@/components/charts/RealTimeChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  organizations, 
  organizationMetrics, 
  serviceMetrics, 
  featureMetrics, 
  events, 
  customers,
  services
} from '@/data/happyfoxData';

const Index = () => {
  // HappyFox specific metrics
  const metrics = [
    {
      id: 'total-organizations',
      title: 'Active Organizations',
      value: organizations.filter(o => o.status === 'active').length,
      change: 12.5,
      changeLabel: 'vs last month',
      icon: Building2,
      format: 'number' as const
    },
    {
      id: 'total-customers',
      title: 'Total Customers',
      value: customers.length,
      change: 8.2,
      changeLabel: 'vs last month',
      icon: Users,
      format: 'number' as const
    },
    {
      id: 'total-events',
      title: 'Total Events',
      value: events.length,
      change: 15.8,
      changeLabel: 'vs last week',
      icon: Activity,
      format: 'number' as const
    },
    {
      id: 'ai-adoption',
      title: 'AI Feature Adoption',
      value: 78.5,
      change: 5.2,
      changeLabel: 'vs last month',
      icon: Brain,
      format: 'percentage' as const
    }
  ];

  // Service usage distribution
  const serviceUsageData = serviceMetrics.map(metric => ({
    name: metric.service.display_name,
    value: metric.total_users,
    color: getServiceColor(metric.service.type)
  }));

  function getServiceColor(type: string) {
    switch (type) {
      case 'ai': return 'hsl(var(--chart-1))'; // Orange
      case 'helpdesk': return 'hsl(var(--chart-2))'; // Blue
      case 'chat': return 'hsl(var(--chart-3))'; // Green
      case 'knowledge_base': return 'hsl(var(--chart-4))'; // Purple
      default: return 'hsl(var(--chart-5))'; // Yellow
    }
  }

  function getServiceIcon(type: string) {
    switch (type) {
      case 'ai': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'helpdesk': return <Settings className="h-4 w-4 text-blue-600" />;
      case 'chat': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'knowledge_base': return <BookOpen className="h-4 w-4 text-orange-600" />;
      default: return <Layers className="h-4 w-4 text-gray-600" />;
    }
  }

  // Events timeline for chart
  const eventsTimelineData = [
    { name: 'Mon', events: 520, clicks: 145, views: 210 },
    { name: 'Tue', events: 668, clicks: 189, views: 267 },
    { name: 'Wed', events: 486, clicks: 156, views: 198 },
    { name: 'Thu', events: 746, clicks: 203, views: 289 },
    { name: 'Fri', events: 839, clicks: 234, views: 315 },
    { name: 'Sat', events: 613, clicks: 167, views: 234 },
    { name: 'Sun', events: 477, clicks: 134, views: 189 },
  ];

  return (
    <div className="flex-1 space-y-8 p-6 bg-gradient-hero min-h-screen">
      {/* Professional Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center shadow-glow">
                          <img src="/hf-mini.png" alt="HappyFox Logo" className="h-6 w-6" />

            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">HappyFox Analytics</h1>
              <p className="text-lg text-muted-foreground">
                Product usage insights across organizations and services
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            Live Data
          </Badge>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <MetricsGrid metrics={metrics} />

      {/* Main Analytics Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column - Charts */}
        <div className="lg:col-span-8 space-y-8">
          {/* Service Usage Timeline */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                Service Usage Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EventsChart data={eventsTimelineData} />
            </CardContent>
          </Card>

          {/* Real-time Activity */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6 text-primary" />
                Real-time Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RealTimeChart />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Service Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Service Distribution */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Service Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceChart data={serviceUsageData} />
            </CardContent>
          </Card>

          {/* Top Organizations */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Top Organizations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {organizationMetrics
                .sort((a, b) => b.total_events - a.total_events)
                .slice(0, 4)
                .map((metric, index) => (
                <div key={metric.organization.id} className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-chart-1' :
                      index === 1 ? 'bg-chart-2' :
                      index === 2 ? 'bg-chart-3' : 'bg-chart-4'
                    }`} />
                    <div>
                      <span className="font-medium text-foreground">{metric.organization.name}</span>
                      {metric.organization.plan_type === 'enterprise' && (
                        <Crown className="h-3 w-3 text-yellow-600 inline ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{metric.total_events}</div>
                    <div className="text-xs text-muted-foreground">{metric.total_customers} users</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Performance Overview */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Layers className="h-6 w-6 text-primary" />
            Service Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {serviceMetrics.map((metric) => {
              const utilizationRate = Math.round((metric.active_users / Math.max(metric.total_users, 1)) * 100);
              
              return (
                <div key={metric.service.id} className="space-y-3 p-4 bg-gradient-card rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(metric.service.type)}
                      <span className="font-medium">{metric.service.display_name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {metric.service.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Users</span>
                      <span className="font-medium">{metric.total_users}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium text-green-600">{metric.active_users}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Events</span>
                      <span className="font-medium text-blue-600">{metric.total_events}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement</span>
                      <span>{utilizationRate}%</span>
                    </div>
                    <Progress value={utilizationRate} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feature Adoption */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-6 w-6 text-primary" />
            Feature Adoption Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureMetrics
              .sort((a, b) => b.adoption_rate - a.adoption_rate)
              .slice(0, 6)
              .map((metric, index) => {
                const service = services.find(s => s.id === metric.feature.service_id);
                
                return (
                  <div 
                    key={metric.feature.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full ${
                        index < 2 ? 'bg-green-500' :
                        index < 4 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          {service && getServiceIcon(service.type)}
                          <span className="font-medium text-foreground">{metric.feature.display_name}</span>
                          {metric.feature.feature_type === 'premium' && (
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{service?.display_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{metric.adoption_rate}%</div>
                      <div className="text-xs text-muted-foreground">{metric.total_users} users</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Recent Activity
            </div>
            <Badge variant="secondary" className="text-xs">
              Live feed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.slice(0, 5).map((event) => {
              const service = services.find(s => s.id === event.service_id);
              const customer = customers.find(c => c.id === event.customer_id);
              const organization = organizations.find(o => o.id === event.organization_id);
              
              return (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border hover:shadow-sm transition-all animate-fade-in"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full bg-chart-1 animate-pulse`} />
                    <div>
                      <p className="font-semibold text-foreground">{event.event_name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{customer?.name}</span>
                        <span>•</span>
                        <span>{organization?.name}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {service?.display_name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{event.session_id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

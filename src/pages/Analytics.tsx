import { BarChart3, TrendingUp, Target, Zap, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricsGrid } from '@/components/advanced/MetricsGrid';
import { AdvancedFilters } from '@/components/advanced/AdvancedFilters';
import { EventsChart } from '@/components/charts/EventsChart';
import { DeviceChart } from '@/components/charts/DeviceChart';
import { RetentionChart } from '@/components/charts/RetentionChart';
import { UserJourneyChart } from '@/components/charts/UserJourneyChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import eventData from '@/data/mockEvents.json';

const Analytics = () => {
  // Professional metrics for analytics
  const analyticsMetrics = [
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: 3.24,
      change: 12.5,
      changeLabel: 'vs last period',
      icon: Target,
      format: 'percentage' as const
    },
    {
      id: 'engagement-rate', 
      title: 'Engagement Rate',
      value: 67.8,
      change: 8.3,
      changeLabel: 'vs last period',
      icon: Zap,
      format: 'percentage' as const
    },
    {
      id: 'page-views',
      title: 'Page Views',
      value: 24567,
      change: 18.2,
      changeLabel: 'vs last period', 
      icon: Activity,
      format: 'number' as const
    },
    {
      id: 'bounce-rate',
      title: 'Bounce Rate', 
      value: 23.1,
      change: -2.1,
      changeLabel: 'vs last period',
      icon: Users,
      format: 'percentage' as const
    }
  ];

  const timelineData = [
    { name: '00:00', events: 45, clicks: 25, views: 65 },
    { name: '04:00', events: 12, clicks: 8, views: 20 },
    { name: '08:00', events: 89, clicks: 56, views: 120 },
    { name: '12:00', events: 156, clicks: 98, views: 210 },
    { name: '16:00', events: 134, clicks: 87, views: 180 },
    { name: '20:00', events: 67, clicks: 43, views: 95 },
  ];

  const deviceBreakdown = (() => {
    const deviceData = eventData.reduce((acc, event) => {
      const device = event.device;
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const deviceEntries = Object.entries(deviceData);
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    
    return deviceEntries.map(([name, value], index) => ({
      name,
      value: value as number,
      color: colors[index % colors.length]
    }));
  })();

  const browserData = eventData.reduce((acc, event) => {
    const browser = event.browser;
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserChart = Object.entries(browserData).map(([name, value]) => ({
    name,
    value: value as number
  }));

  const topComponents = eventData.reduce((acc, event) => {
    const component = event.component;
    acc[component] = (acc[component] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topComponentsChart = Object.entries(topComponents)
    .map(([name, value]) => ({ name, total: value }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <img src="/hf-mini.png" alt="HappyFox Logo" className="h-6 w-6" />
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Deep insights into user behavior and application performance
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
                <p className="text-xs text-success">+0.5% from last week</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold text-foreground">67.8%</p>
                <p className="text-xs text-success">+12% from last week</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold text-foreground">24.5K</p>
                <p className="text-xs text-success">+18% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold text-foreground">23.1%</p>
                <p className="text-xs text-destructive">+2% from last week</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Components */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Most Interacted Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topComponentsChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs fill-muted-foreground"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Activity */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Hourly Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <EventsChart data={timelineData} />
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <DeviceChart data={deviceBreakdown} />
          </CardContent>
        </Card>

        {/* Browser Distribution */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Browser Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {browserChart.map((browser, index) => {
                const percentage = Math.round((browser.value / eventData.length) * 100);
                return (
                  <div key={browser.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))` }}
                      />
                      <span className="font-medium text-foreground">{browser.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Types Breakdown */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Event Types Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['click', 'view', 'submit', 'focus', 'hover'].map((type) => {
              const count = eventData.filter(e => e.type === type).length;
              const percentage = Math.round((count / eventData.length) * 100);
              
              return (
                <div key={type} className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-foreground">{count}</div>
                  <div className="text-sm font-medium text-muted-foreground capitalize">{type}</div>
                  <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
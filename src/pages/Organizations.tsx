import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Activity, Calendar, TrendingUp, Crown } from "lucide-react";
import { organizations, organizationMetrics, customerServiceAccess, services } from "@/data/happyfoxData";
import { Organization } from "@/types/schema";

const Organizations = () => {
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pro': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'starter': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanIcon = (plan: string) => {
    if (plan === 'enterprise') return <Crown className="h-3 w-3" />;
    return null;
  };

  const getServicesForOrg = (orgId: string) => {
    const orgServices = customerServiceAccess
      .filter(access => access.organization_id === orgId && access.status === 'active')
      .map(access => access.service_id);
    return [...new Set(orgServices)].map(serviceId => 
      services.find(s => s.id === serviceId)
    ).filter(Boolean);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">
            Manage customer organizations and their HappyFox service usage
          </p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">
              {organizations.filter(o => o.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Customers</CardTitle>
            <Crown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.filter(o => o.plan_type === 'enterprise').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((organizations.filter(o => o.plan_type === 'enterprise').length / organizations.length) * 100)}% of total
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
              {organizationMetrics.reduce((sum, metric) => sum + metric.total_customers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all organizations
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
              {organizationMetrics.reduce((sum, metric) => sum + metric.total_events, 0)}
            </div>
            <p className="text-xs text-green-600">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Organizations List */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations Overview</CardTitle>
          <CardDescription>
            Detailed view of all customer organizations and their service usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizationMetrics.map((metric) => {
              const org = metric.organization;
              const orgServices = getServicesForOrg(org.id);
              
              return (
                <div key={org.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{org.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getPlanBadgeColor(org.plan_type)}
                        >
                          {getPlanIcon(org.plan_type)}
                          <span className="ml-1 capitalize">{org.plan_type}</span>
                        </Badge>
                        <Badge variant={org.status === 'active' ? 'default' : 'destructive'}>
                          {org.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{org.domain}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Member since</div>
                      <div className="text-sm font-medium">
                        {new Date(org.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{metric.total_customers}</div>
                      <div className="text-xs text-muted-foreground">Total Users</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{metric.active_customers}</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{metric.total_events}</div>
                      <div className="text-xs text-muted-foreground">Total Events</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{metric.services_used}</div>
                      <div className="text-xs text-muted-foreground">Services Used</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{metric.avg_session_duration}s</div>
                      <div className="text-xs text-muted-foreground">Avg Session</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Active Services:</div>
                    <div className="flex gap-2 flex-wrap">
                      {orgServices.map(service => (
                        <Badge key={service?.id} variant="secondary" className="text-xs">
                          {service?.display_name}
                        </Badge>
                      ))}
                      {orgServices.length === 0 && (
                        <span className="text-sm text-muted-foreground">No active services</span>
                      )}
                    </div>
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

export default Organizations;

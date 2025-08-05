import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserCheck, Building2, Activity, Calendar, Shield } from "lucide-react";
import { customers, organizations, customerServiceAccess, services, events } from "@/data/happyfoxData";

const Customers = () => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role === 'admin') return <Shield className="h-3 w-3" />;
    return <UserCheck className="h-3 w-3" />;
  };

  const getCustomerServices = (customerId: string) => {
    const customerAccess = customerServiceAccess
      .filter(access => access.customer_id === customerId && access.status === 'active')
      .map(access => access.service_id);
    return [...new Set(customerAccess)].map(serviceId => 
      services.find(s => s.id === serviceId)
    ).filter(Boolean);
  };

  const getCustomerEvents = (customerId: string) => {
    return events.filter(e => e.customer_id === customerId);
  };

  const getOrganization = (orgId: string) => {
    return organizations.find(o => o.id === orgId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getLastActivity = (customerId: string) => {
    const customerAccess = customerServiceAccess
      .filter(access => access.customer_id === customerId && access.status === 'active')
      .sort((a, b) => new Date(b.last_used_at).getTime() - new Date(a.last_used_at).getTime());
    
    return customerAccess[0]?.last_used_at;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer users across all organizations and services
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              {customers.filter(c => c.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((customers.filter(c => c.role === 'admin').length / customers.length) * 100)}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-Service Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => getCustomerServices(c.id).length > 1).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Using multiple services
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
              {events.length}
            </div>
            <p className="text-xs text-green-600">
              Across all customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Comprehensive view of all customer users and their service access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => {
              const organization = getOrganization(customer.organization_id);
              const customerServices = getCustomerServices(customer.id);
              const customerEvents = getCustomerEvents(customer.id);
              const lastActivity = getLastActivity(customer.id);
              
              return (
                <div key={customer.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={getRoleBadgeColor(customer.role)}
                          >
                            {getRoleIcon(customer.role)}
                            <span className="ml-1 capitalize">{customer.role}</span>
                          </Badge>
                          <Badge variant={customer.status === 'active' ? 'default' : 'destructive'}>
                            {customer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{organization?.name} ({organization?.domain})</span>
                          <Badge variant="outline" className="text-xs">
                            {organization?.plan_type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Last Active</div>
                      <div className="text-sm font-medium">
                        {lastActivity ? new Date(lastActivity).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{customerServices.length}</div>
                      <div className="text-xs text-muted-foreground">Services Used</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{customerEvents.length}</div>
                      <div className="text-xs text-muted-foreground">Total Events</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {customerEvents.length > 0 ? Math.round(customerEvents.length / Math.max(new Set(customerEvents.map(e => e.session_id)).size, 1)) : 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Events/Session</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {Math.floor(Math.random() * 30) + 5}m
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Session Time</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Service Access:</div>
                    <div className="flex gap-2 flex-wrap">
                      {customerServices.map(service => {
                        const access = customerServiceAccess.find(a => 
                          a.customer_id === customer.id && a.service_id === service?.id
                        );
                        
                        return (
                          <div key={service?.id} className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {service?.display_name}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={access?.access_level === 'admin' ? 'text-purple-600' : 'text-blue-600'}
                            >
                              {access?.access_level}
                            </Badge>
                          </div>
                        );
                      })}
                      {customerServices.length === 0 && (
                        <span className="text-sm text-muted-foreground">No active services</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      Member since {new Date(customer.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Manage Access
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Customer Analytics Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>
              Breakdown of customer roles across all organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['admin', 'agent', 'user'].map(role => {
                const count = customers.filter(c => c.role === role).length;
                const percentage = Math.round((count / customers.length) * 100);
                
                return (
                  <div key={role} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(role)}
                      <span className="capitalize">{role}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Activity Status</CardTitle>
            <CardDescription>
              Recent activity and engagement levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Active Today</span>
                <span className="font-bold text-green-600">
                  {customers.filter(c => {
                    const lastActivity = getLastActivity(c.id);
                    return lastActivity && new Date(lastActivity).toDateString() === new Date().toDateString();
                  }).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active This Week</span>
                <span className="font-bold text-blue-600">
                  {customers.filter(c => {
                    const lastActivity = getLastActivity(c.id);
                    if (!lastActivity) return false;
                    const daysDiff = (new Date().getTime() - new Date(lastActivity).getTime()) / (1000 * 3600 * 24);
                    return daysDiff <= 7;
                  }).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Inactive (30+ days)</span>
                <span className="font-bold text-red-600">
                  {customers.filter(c => {
                    const lastActivity = getLastActivity(c.id);
                    if (!lastActivity) return true;
                    const daysDiff = (new Date().getTime() - new Date(lastActivity).getTime()) / (1000 * 3600 * 24);
                    return daysDiff > 30;
                  }).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customers;

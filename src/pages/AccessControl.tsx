import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Eye, 
  Edit, 
  Building2, 
  Layers, 
  UserCheck,
  Settings,
  Brain,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { internalUsers, organizations, services, customerServiceAccess } from "@/data/happyfoxData";

const AccessControl = () => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'analyst': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'viewer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDepartmentBadgeColor = (department: string) => {
    switch (department) {
      case 'product': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'engineering': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'support': return 'bg-green-100 text-green-800 border-green-200';
      case 'sales': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'marketing': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'analyst': return <Eye className="h-4 w-4" />;
      case 'manager': return <Users className="h-4 w-4" />;
      case 'viewer': return <UserCheck className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'ai': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'helpdesk': return <Settings className="h-4 w-4 text-blue-600" />;
      case 'chat': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'knowledge_base': return <BookOpen className="h-4 w-4 text-orange-600" />;
      default: return <Layers className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Mock access control data since it's not in the main data file
  const mockUserAccessControl = [
    {
      user_id: 'int-001',
      organization_id: null, // Access to all orgs
      service_id: null, // Access to all services
      access_level: 'full'
    },
    {
      user_id: 'int-002',
      organization_id: '01234567-89ab-cdef-0123-456789abcdef',
      service_id: 'svc-hd-001',
      access_level: 'readonly'
    },
    {
      user_id: 'int-003',
      organization_id: null,
      service_id: 'svc-ai-001',
      access_level: 'readonly'
    }
  ];

  const getUserAccess = (userId: string) => {
    return mockUserAccessControl.filter(access => access.user_id === userId);
  };

  const getAccessDescription = (access: typeof mockUserAccessControl[0]) => {
    if (!access.organization_id && !access.service_id) {
      return 'All organizations and services';
    }
    if (!access.organization_id) {
      const service = services.find(s => s.id === access.service_id);
      return `All organizations - ${service?.display_name || 'Unknown Service'}`;
    }
    if (!access.service_id) {
      const org = organizations.find(o => o.id === access.organization_id);
      return `${org?.name || 'Unknown Org'} - All services`;
    }
    const org = organizations.find(o => o.id === access.organization_id);
    const service = services.find(s => s.id === access.service_id);
    return `${org?.name || 'Unknown'} - ${service?.display_name || 'Unknown'}`;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">
            Manage internal user permissions for organizations and services (RBAC)
          </p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Add Access Rule
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Internal Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internalUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {internalUsers.filter(u => u.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {internalUsers.filter(u => u.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full access users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Access Rules</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserAccessControl.length}</div>
            <p className="text-xs text-muted-foreground">
              Active permissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(internalUsers.map(u => u.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique departments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Internal Users</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Internal Users & Access</CardTitle>
              <CardDescription>
                HappyFox employees and their data access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internalUsers.map((user) => {
                  const userAccess = getUserAccess(user.id);
                  
                  return (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={getRoleBadgeColor(user.role)}
                              >
                                {getRoleIcon(user.role)}
                                <span className="ml-1 capitalize">{user.role}</span>
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={getDepartmentBadgeColor(user.department)}
                              >
                                {user.department}
                              </Badge>
                              <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Access
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Access Permissions:</div>
                        <div className="space-y-2">
                          {userAccess.map((access, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={access.access_level === 'full' ? 'default' : 'secondary'}
                                >
                                  {access.access_level === 'full' ? (
                                    <Edit className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Eye className="h-3 w-3 mr-1" />
                                  )}
                                  {access.access_level}
                                </Badge>
                                <span className="text-sm">{getAccessDescription(access)}</span>
                              </div>
                            </div>
                          ))}
                          {userAccess.length === 0 && (
                            <span className="text-sm text-muted-foreground">No specific access rules</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of user access across organizations and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">User</th>
                      <th className="text-center p-3">Role</th>
                      <th className="text-center p-3">Department</th>
                      {services.map(service => (
                        <th key={service.id} className="text-center p-3 min-w-[120px]">
                          <div className="flex items-center justify-center gap-1">
                            {getServiceIcon(service.type)}
                            <span className="text-xs">{service.display_name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {internalUsers.map((user) => {
                      const userAccess = getUserAccess(user.id);
                      
                      return (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className={getDepartmentBadgeColor(user.department)}>
                              {user.department}
                            </Badge>
                          </td>
                          {services.map(service => {
                            const hasAccess = userAccess.some(access => 
                              !access.service_id || access.service_id === service.id
                            );
                            const accessLevel = userAccess.find(access => 
                              !access.service_id || access.service_id === service.id
                            )?.access_level;
                            
                            return (
                              <td key={service.id} className="p-3 text-center">
                                {hasAccess ? (
                                  <Badge 
                                    variant={accessLevel === 'full' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {accessLevel === 'full' ? <Edit className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                  </Badge>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Role Definitions */}
          <Card>
            <CardHeader>
              <CardTitle>Role Definitions</CardTitle>
              <CardDescription>
                Understanding different access levels and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Admin</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800">Full Access</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete access to all organizations, services, and data. Can manage users and settings.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Analyst</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Data Access</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Can view and analyze data across assigned organizations and services.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Manager</span>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">Team Access</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Can view team-related data and manage specific service areas.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Viewer</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">Read Only</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Read-only access to specific dashboards and reports.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Audit Trail</CardTitle>
              <CardDescription>
                Recent access changes and security events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mock audit entries */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Access Granted
                    </Badge>
                    <span className="text-sm">
                      <strong>Emma Sales</strong> granted viewer access to AI Service
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Role Updated
                    </Badge>
                    <span className="text-sm">
                      <strong>Mike Support</strong> role changed from viewer to analyst
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Access Modified
                    </Badge>
                    <span className="text-sm">
                      <strong>Sarah Analytics</strong> access scope updated for TechCorp
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      Access Revoked
                    </Badge>
                    <span className="text-sm">
                      <strong>Former Employee</strong> all access permissions removed
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessControl;

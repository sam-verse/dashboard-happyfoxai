import { 
  BarChart3, 
  Building2, 
  Users, 
  Settings, 
  Activity, 
  Home, 
  Layers,
  UserCheck,
  Zap
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Overview', url: '/', icon: Home },
  { title: 'Organizations', url: '/organizations', icon: Building2 },
  { title: 'Services', url: '/services', icon: Layers },
  { title: 'Features', url: '/features', icon: Zap },
  { title: 'Customers', url: '/customers', icon: Users },
  { title: 'Events', url: '/events', icon: Activity },
  { title: 'Sessions', url: '/sessions', icon: UserCheck },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Access Control', url: '/access', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const getNavCls = (active: boolean) =>
    active 
      ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary hover:bg-primary/15' 
      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50';

  return (
    <Sidebar 
      className={`border-r border-border bg-card transition-all duration-300 ${
        state === 'collapsed' ? 'w-16' : 'w-64'
      }`}
      collapsible="icon"
    >
      <SidebarContent className="px-2 py-4">
        {/* HappyFox Branding */}
        <div className={`px-3 mb-6 ${state === 'collapsed' ? 'hidden' : 'block'}`}>
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <img src="/hf-mini.png" alt="HappyFox Logo" className="h-6 w-6" />
            {/* <BarChart3 className="h-6 w-6" /> */}
            <span>HappyFox Analytics</span>
            </div>
          <p className="text-xs text-muted-foreground mt-1">Product Usage Insights</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider ${
            state === 'collapsed' ? 'hidden' : 'block'
          }`}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavCls(active)}`}
                        title={item.title}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {state !== 'collapsed' && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats - Only show when expanded */}
        {state !== 'collapsed' && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Quick Stats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 space-y-3">
                <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                  <div className="text-sm font-medium text-foreground">Active Orgs</div>
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-xs text-success">All services</div>
                </div>
                
                <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                  <div className="text-sm font-medium text-foreground">Today's Events</div>
                  <div className="text-2xl font-bold text-accent-blue">1,247</div>
                  <div className="text-xs text-success">+12% from yesterday</div>
                </div>

                <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                  <div className="text-sm font-medium text-foreground">AI Usage</div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-xs text-muted-foreground">Sessions today</div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
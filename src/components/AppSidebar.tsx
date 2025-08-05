import React from 'react';
import { 
  BarChart3, 
  Building2, 
  Users, 
  Settings, 
  Activity, 
  Home, 
  Layers,
  UserCheck,
  Zap,
  PanelLeftClose,
  PanelLeft
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
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const { state, toggleSidebar } = useSidebar();
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
        state === 'collapsed' ? 'w-[4.5rem]' : 'w-64'
      }`}
      collapsible="icon"
    >
      {/* Enhanced Header with Toggle */}
      <SidebarHeader className="border-b border-border/50 p-0">
        <div className="flex items-center justify-between h-16 px-4">
          {/* HappyFox Branding */}
          <div className={`flex items-center gap-2 ${state === 'collapsed' ? 'justify-center w-full' : ''}`}>
            <img src="/hf-mini.png" alt="HappyFox Logo" className="h-6 w-6 flex-shrink-0" />
            {state !== 'collapsed' && (
              <div className="flex flex-col">
                <span className="text-primary font-bold text-sm">HappyFox Analytics</span>
                <span className="text-xs text-muted-foreground">Product Insights</span>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle Button */}
          {state !== 'collapsed' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 hover:bg-accent/50 transition-all duration-200"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                <p>Collapse sidebar</p>
                <p className="text-muted-foreground">Ctrl/⌘ + B</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">

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
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] ${getNavCls(active)} ${
                          state === 'collapsed' ? 'justify-center' : ''
                        }`}
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
              
              {/* Separator - Only show when expanded */}
              {state !== 'collapsed' && (
                <div className="h-px bg-border/50 mx-3 my-2" />
              )}
              
              {/* Collapse Sidebar Button - Only show when expanded */}
              {state !== 'collapsed' && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10">
                    <button
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] text-muted-foreground hover:text-foreground hover:bg-accent/50 w-full"
                      title="Toggle Sidebar"
                    >
                      <PanelLeftClose className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">Collapse Sidebar</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Quick Stats - Only show when expanded */}
        {state !== 'collapsed' && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="px-3 mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="h-3 w-3" />
              Quick Stats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 space-y-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg border border-border hover:shadow-sm transition-all duration-200 hover:scale-[1.02]">
                  <div className="text-sm font-medium text-foreground">Active Orgs</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">All services</div>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-lg border border-border hover:shadow-sm transition-all duration-200 hover:scale-[1.02]">
                  <div className="text-sm font-medium text-foreground">Today's Events</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,247</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">+12% from yesterday</div>
                </div>

                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-lg border border-border hover:shadow-sm transition-all duration-200 hover:scale-[1.02]">
                  <div className="text-sm font-medium text-foreground">AI Usage</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</div>
                  <div className="text-xs text-muted-foreground">Sessions today</div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer with Expand Button - Only show when collapsed */}
      {state === 'collapsed' && (
        <SidebarFooter className="p-0 border-t border-border/50">
          <div className="flex justify-center py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-10 w-10 hover:bg-accent/50 transition-all duration-200 hover:scale-105"
                  aria-label="Expand sidebar"
                >
                  <PanelLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                <p>Expand sidebar</p>
                <p className="text-muted-foreground">Ctrl/⌘ + B</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
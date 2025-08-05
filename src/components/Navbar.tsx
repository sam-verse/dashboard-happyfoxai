import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, BarChart3, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export function Navbar({ onMobileMenuToggle, isMobileMenuOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { state, toggleSidebar } = useSidebar();

  // Custom sidebar toggle with enhanced styling
  const CustomSidebarTrigger = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="hidden md:flex h-9 w-9 hover:bg-accent/50 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={state === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {state === 'expanded' ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>{state === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar'}</p>
        <p className="text-muted-foreground">Ctrl/⌘ + B</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          {/* Enhanced Sidebar Toggle for Desktop */}
          <CustomSidebarTrigger />

          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-border" />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 hover:bg-accent/50 transition-all duration-200"
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>

          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-background`}
            >
              <img src="/hf-mini.png" alt="HappyFox Logo" className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">Analytics</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 hover:bg-accent/50 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Switch to {theme === 'light' ? 'dark' : 'light'} mode</p>
            </TooltipContent>
          </Tooltip>

          {/* Separator */}
          <div className="h-6 w-px bg-border" />

          {/* User Avatar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                <span className="text-sm font-semibold text-white">
                  U
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>User Profile</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
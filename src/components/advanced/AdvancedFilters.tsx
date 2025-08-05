import { useState } from 'react';
import { CalendarDays, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterState {
  search: string;
  dateRange: string;
  devices: string[];
  browsers: string[];
  eventTypes: string[];
  userSegments: string[];
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: 'Last 7 days',
    devices: [],
    browsers: [],
    eventTypes: [],
    userSegments: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRanges = ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom'];
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
  const eventTypes = ['click', 'view', 'submit', 'focus', 'hover', 'change'];
  const userSegments = ['New Users', 'Returning Users', 'Power Users', 'At Risk'];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      dateRange: 'Last 7 days',
      devices: [],
      browsers: [],
      eventTypes: [],
      userSegments: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return (
      (filters.search ? 1 : 0) +
      (filters.dateRange !== 'Last 7 days' ? 1 : 0) +
      filters.devices.length +
      filters.browsers.length +
      filters.eventTypes.length +
      filters.userSegments.length
    );
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card className="p-4 border border-border bg-card shadow-card">
      <div className="space-y-4">
        {/* Top Row - Search and Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events, users, or components..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Date Range */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-10">
                <CalendarDays className="h-4 w-4" />
                {filters.dateRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg">
              <DropdownMenuLabel>Date Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dateRanges.map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => updateFilter('dateRange', range)}
                  className="cursor-pointer"
                >
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2 h-10"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="gap-2 h-10"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            {/* Devices */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Devices</label>
              <div className="space-y-2">
                {devices.map((device) => (
                  <label key={device} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.devices.includes(device)}
                      onChange={() => toggleArrayFilter('devices', device)}
                      className="rounded border-border"
                    />
                    <span className="text-foreground">{device}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Browsers */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Browsers</label>
              <div className="space-y-2">
                {browsers.map((browser) => (
                  <label key={browser} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.browsers.includes(browser)}
                      onChange={() => toggleArrayFilter('browsers', browser)}
                      className="rounded border-border"
                    />
                    <span className="text-foreground">{browser}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Event Types */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Event Types</label>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.eventTypes.includes(type)}
                      onChange={() => toggleArrayFilter('eventTypes', type)}
                      className="rounded border-border"
                    />
                    <span className="text-foreground capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* User Segments */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">User Segments</label>
              <div className="space-y-2">
                {userSegments.map((segment) => (
                  <label key={segment} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.userSegments.includes(segment)}
                      onChange={() => toggleArrayFilter('userSegments', segment)}
                      className="rounded border-border"
                    />
                    <span className="text-foreground">{segment}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.search}
                <button onClick={() => updateFilter('search', '')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dateRange !== 'Last 7 days' && (
              <Badge variant="secondary" className="gap-1">
                {filters.dateRange}
                <button onClick={() => updateFilter('dateRange', 'Last 7 days')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {[...filters.devices, ...filters.browsers, ...filters.eventTypes, ...filters.userSegments].map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <button onClick={() => {
                  ['devices', 'browsers', 'eventTypes', 'userSegments'].forEach(key => {
                    if (filters[key as keyof FilterState]?.includes?.(filter)) {
                      toggleArrayFilter(key as keyof FilterState, filter);
                    }
                  });
                }}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
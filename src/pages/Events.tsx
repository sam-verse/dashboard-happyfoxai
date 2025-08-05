import { useState } from 'react';
import { Search, Filter, Download, Calendar, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import eventData from '@/data/mockEvents.json';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const eventTypes = ['all', 'click', 'view', 'submit', 'focus', 'hover', 'change'];
  
  const filteredEvents = eventData.filter(event => {
    const matchesSearch = event.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getEventTypeColor = (type: string) => {
    const colors = {
      click: 'bg-primary/10 text-primary border-primary/20',
      view: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
      submit: 'bg-success/10 text-success border-success/20',
      focus: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
      hover: 'bg-warning/10 text-warning border-warning/20',
      change: 'bg-chart-3/10 text-chart-3 border-chart-3/20'
    };
    return colors[type as keyof typeof colors] || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            Events
          </h1>
          <p className="text-muted-foreground">
            Detailed view of all tracked events and user interactions
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events, components, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Event Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {eventTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="h-8 px-3 text-xs"
                  >
                    {type === 'all' ? 'All Types' : type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Event Log
            <Badge variant="secondary" className="text-xs">
              {filteredEvents.length} events
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${
                  index !== filteredEvents.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Event Type Badge */}
                  <Badge 
                    variant="outline" 
                    className={`${getEventTypeColor(event.type)} font-medium`}
                  >
                    {event.type}
                  </Badge>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">
                        {event.component}
                      </h4>
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>User: {event.userId}</span>
                      <span>•</span>
                      <span>{event.device}</span>
                      <span>•</span>
                      <span>{event.browser}</span>
                      <span>•</span>
                      <span>{event.path}</span>
                    </div>
                  </div>
                </div>

                {/* Timestamp & Duration */}
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.duration}ms
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-1">No events found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
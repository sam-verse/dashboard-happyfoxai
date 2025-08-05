import { Users, Monitor, Smartphone, Tablet, Globe, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/StatsCard';
import eventData from '@/data/mockEvents.json';

const Sessions = () => {
  // Group events by session
  const sessionData = eventData.reduce((acc, event) => {
    if (!acc[event.sessionId]) {
      acc[event.sessionId] = {
        sessionId: event.sessionId,
        userId: event.userId,
        device: event.device,
        browser: event.browser,
        os: event.os,
        events: [],
        startTime: event.timestamp,
        endTime: event.timestamp,
      };
    }
    acc[event.sessionId].events.push(event);
    
    // Update end time if this event is later
    if (new Date(event.timestamp) > new Date(acc[event.sessionId].endTime)) {
      acc[event.sessionId].endTime = event.timestamp;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const sessions = Object.values(sessionData);

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  // Calculate session stats
  const totalSessions = sessions.length;
  const avgEventsPerSession = Math.round(eventData.length / totalSessions);
  const avgSessionDuration = sessions.reduce((acc, session) => {
    const duration = new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
    return acc + duration;
  }, 0) / sessions.length;
  const avgDurationFormatted = `${Math.round(avgSessionDuration / 60000)}m`;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Sessions
          </h1>
          <p className="text-muted-foreground">
            User session tracking and behavior analysis
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sessions"
          value={totalSessions}
          change="+15% from last week"
          changeType="positive"
          icon={Users}
          description="Unique sessions"
        />
        <StatsCard
          title="Avg Events/Session"
          value={avgEventsPerSession}
          change="+3% from last week"
          changeType="positive"
          icon={Globe}
          description="Events per session"
        />
        <StatsCard
          title="Avg Duration"
          value={avgDurationFormatted}
          change="-5% from last week"
          changeType="negative"
          icon={Clock}
          description="Session length"
        />
        <StatsCard
          title="Bounce Rate"
          value="23%"
          change="-8% from last week"
          changeType="positive"
          icon={Monitor}
          description="Single event sessions"
        />
      </div>

      {/* Sessions List */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {sessions.map((session, index) => {
              const DeviceIcon = getDeviceIcon(session.device);
              const duration = calculateDuration(session.startTime, session.endTime);
              
              return (
                <div 
                  key={session.sessionId}
                  className={`p-4 hover:bg-muted/30 transition-colors ${
                    index !== sessions.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <DeviceIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">
                            {session.userId}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {session.device}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{session.browser}</span>
                          <span>•</span>
                          <span>{session.os}</span>
                          <span>•</span>
                          <span>{session.events.length} events</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {new Date(session.startTime).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Duration: {duration}
                      </div>
                    </div>
                  </div>

                  {/* Session Events Timeline */}
                  <div className="ml-13 pl-3 border-l-2 border-border">
                    <div className="space-y-2">
                      {session.events.slice(0, 3).map((event: any) => (
                        <div key={event.id} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-foreground font-medium">{event.component}</span>
                          <span className="text-muted-foreground">({event.type})</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                      {session.events.length > 3 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                          <span>+{session.events.length - 3} more events</span>
                        </div>
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

export default Sessions;
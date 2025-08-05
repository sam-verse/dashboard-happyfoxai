import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wifi } from 'lucide-react';

interface RealTimeDataPoint {
  time: string;
  events: number;
  users: number;
}

export function RealTimeChart() {
  const [data, setData] = useState<RealTimeDataPoint[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initialize with some data
    const initialData: RealTimeDataPoint[] = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 1000);
      initialData.push({
        time: time.toLocaleTimeString(),
        events: Math.floor(Math.random() * 50) + 10,
        users: Math.floor(Math.random() * 20) + 5,
      });
    }
    
    setData(initialData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive) {
        setData(prev => {
          const newData = [...prev.slice(1)];
          const now = new Date();
          newData.push({
            time: now.toLocaleTimeString(),
            events: Math.floor(Math.random() * 50) + 10,
            users: Math.floor(Math.random() * 20) + 5,
          });
          return newData;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const currentEvents = data[data.length - 1]?.events || 0;
  const currentUsers = data[data.length - 1]?.users || 0;

  return (
    <div className="space-y-4">
      {/* Real-time Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            isLive ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
            {isLive ? 'LIVE' : 'PAUSED'}
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-chart-1" />
            <span className="font-semibold text-foreground">{currentEvents}</span>
            <span className="text-muted-foreground">events/min</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-chart-2" />
            <span className="font-semibold text-foreground">{currentUsers}</span>
            <span className="text-muted-foreground">users online</span>
          </div>
        </div>
      </div>

      {/* Real-time Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border opacity-30" />
            <XAxis 
              dataKey="time" 
              className="text-xs fill-muted-foreground"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#eventsGradient)"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#usersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
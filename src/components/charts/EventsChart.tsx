import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EventsChartProps {
  data: Array<{
    name: string;
    events: number;
    clicks: number;
    views: number;
  }>;
}

export function EventsChart({ data }: EventsChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="name" 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line 
            type="monotone" 
            dataKey="events" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
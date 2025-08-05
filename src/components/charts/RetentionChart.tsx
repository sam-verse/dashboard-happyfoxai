import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface RetentionData {
  cohort: string;
  day0: number;
  day1: number;
  day7: number;
  day14: number;
  day30: number;
}

interface RetentionChartProps {
  data: RetentionData[];
}

export function RetentionChart({ data }: RetentionChartProps) {
  // Transform data for line chart
  const chartData = [
    { day: 'Day 0', value: data.reduce((acc, d) => acc + d.day0, 0) / data.length },
    { day: 'Day 1', value: data.reduce((acc, d) => acc + d.day1, 0) / data.length },
    { day: 'Day 7', value: data.reduce((acc, d) => acc + d.day7, 0) / data.length },
    { day: 'Day 14', value: data.reduce((acc, d) => acc + d.day14, 0) / data.length },
    { day: 'Day 30', value: data.reduce((acc, d) => acc + d.day30, 0) / data.length },
  ];

  return (
    <div className="space-y-6">
      {/* Retention Curve */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border opacity-30" />
            <XAxis 
              dataKey="day" 
              className="text-xs fill-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)'
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Retention']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Retention Heatmap */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Cohort Retention Heatmap</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Cohort</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">Day 0</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">Day 1</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">Day 7</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">Day 14</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">Day 30</th>
              </tr>
            </thead>
            <tbody>
              {data.map((cohort, index) => (
                <tr key={cohort.cohort} className="border-b border-border/50">
                  <td className="py-2 px-3 font-medium text-foreground">{cohort.cohort}</td>
                  <td className="py-2 px-3 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-8 bg-chart-1/20 text-chart-1 rounded text-xs font-medium">
                      {cohort.day0}%
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium ${
                      cohort.day1 >= 80 ? 'bg-success/20 text-success' :
                      cohort.day1 >= 60 ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {cohort.day1}%
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium ${
                      cohort.day7 >= 50 ? 'bg-success/20 text-success' :
                      cohort.day7 >= 30 ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {cohort.day7}%
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium ${
                      cohort.day14 >= 40 ? 'bg-success/20 text-success' :
                      cohort.day14 >= 20 ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {cohort.day14}%
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium ${
                      cohort.day30 >= 30 ? 'bg-success/20 text-success' :
                      cohort.day30 >= 15 ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {cohort.day30}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
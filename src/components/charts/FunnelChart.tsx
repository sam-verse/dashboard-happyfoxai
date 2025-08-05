import { TrendingDown, Users, Target, CheckCircle } from 'lucide-react';

interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
  dropoff?: number;
}

interface FunnelChartProps {
  data: FunnelStep[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = Math.max(...data.map(step => step.value));

  return (
    <div className="space-y-4">
      {data.map((step, index) => {
        const width = (step.value / maxValue) * 100;
        const isLast = index === data.length - 1;
        
        return (
          <div key={step.name} className="relative">
            {/* Funnel Step */}
            <div className="flex items-center gap-4 p-4 bg-gradient-card rounded-lg border border-border hover:shadow-card transition-all">
              <div className="flex-shrink-0">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-chart-1/10 text-chart-1' :
                  index === 1 ? 'bg-chart-2/10 text-chart-2' :
                  index === 2 ? 'bg-chart-3/10 text-chart-3' :
                  'bg-chart-4/10 text-chart-4'
                }`}>
                  {index === 0 ? <Users className="h-5 w-5" /> :
                   index === 1 ? <Target className="h-5 w-5" /> :
                   index === 2 ? <CheckCircle className="h-5 w-5" /> :
                   <TrendingDown className="h-5 w-5" />}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{step.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {step.percentage}%
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      index === 0 ? 'bg-chart-1' :
                      index === 1 ? 'bg-chart-2' :
                      index === 2 ? 'bg-chart-3' :
                      'bg-chart-4'
                    }`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Dropoff Indicator */}
            {!isLast && step.dropoff && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
                  <TrendingDown className="h-3 w-3" />
                  {step.dropoff}% dropoff
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
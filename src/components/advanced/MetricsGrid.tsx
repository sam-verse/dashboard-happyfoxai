import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
}

interface MetricsGridProps {
  metrics: Metric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const formatValue = (value: string | number, format: string = 'number') => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'duration':
        return `${value}ms`;
      default:
        return value.toLocaleString();
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-success bg-success/10';
    if (change < 0) return 'text-destructive bg-destructive/10';
    return 'text-muted-foreground bg-muted/10';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const TrendIcon = getTrendIcon(metric.change);
        const trendColor = getTrendColor(metric.change);
        
        return (
          <div
            key={metric.id}
            className="group relative p-6 bg-gradient-card rounded-xl border border-border hover:shadow-card transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendColor}`}>
                  <TrendIcon className="h-3 w-3" />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              
              {/* Value */}
              <div className="mb-2">
                <div className="text-3xl font-bold text-foreground tracking-tight">
                  {formatValue(metric.value, metric.format)}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </div>
              </div>
              
              {/* Change Label */}
              <div className="text-xs text-muted-foreground">
                {metric.changeLabel}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
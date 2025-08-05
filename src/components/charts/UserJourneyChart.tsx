import { ArrowRight, Circle, Target, CheckCircle2, XCircle } from 'lucide-react';

interface JourneyStep {
  id: string;
  name: string;
  type: 'entry' | 'action' | 'decision' | 'exit';
  users: number;
  conversionRate?: number;
  dropoffRate?: number;
}

interface UserJourneyChartProps {
  data: JourneyStep[];
}

export function UserJourneyChart({ data }: UserJourneyChartProps) {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return Circle;
      case 'action':
        return Target;
      case 'decision':
        return CheckCircle2;
      case 'exit':
        return XCircle;
      default:
        return Circle;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'entry':
        return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
      case 'action':
        return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case 'decision':
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'exit':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="relative">
      {/* Journey Flow */}
      <div className="flex items-center justify-between overflow-x-auto pb-4">
        {data.map((step, index) => {
          const Icon = getStepIcon(step.type);
          const isLast = index === data.length - 1;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Journey Step */}
              <div className="flex flex-col items-center min-w-[160px]">
                {/* Step Icon */}
                <div className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 ${getStepColor(step.type)}`}>
                  <Icon className="w-6 h-6" />
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step Info */}
                <div className="text-center">
                  <h4 className="font-semibold text-foreground text-sm mb-1">{step.name}</h4>
                  <p className="text-lg font-bold text-foreground">{step.users.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground capitalize">{step.type}</p>
                  
                  {/* Conversion/Dropoff Rate */}
                  {step.conversionRate && (
                    <div className="mt-2 px-2 py-1 bg-success/20 text-success text-xs rounded-full">
                      {step.conversionRate}% conversion
                    </div>
                  )}
                  {step.dropoffRate && (
                    <div className="mt-2 px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full">
                      {step.dropoffRate}% dropoff
                    </div>
                  )}
                </div>
              </div>
              
              {/* Arrow */}
              {!isLast && (
                <div className="flex items-center mx-4">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Journey Metrics */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">{data[0]?.users.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Entries</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">
            {data[data.length - 1]?.users.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Completions</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-success">
            {Math.round((data[data.length - 1]?.users / data[0]?.users) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-primary">
            {data.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Steps</div>
        </div>
      </div>
    </div>
  );
}
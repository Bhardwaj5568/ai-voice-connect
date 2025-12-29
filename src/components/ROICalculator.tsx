import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const ROICalculator = () => {
  const [callsPerMonth, setCallsPerMonth] = useState(5000);
  const [avgCallDuration, setAvgCallDuration] = useState(5);
  const [costPerHour, setCostPerHour] = useState(25);

  const calculations = useMemo(() => {
    const totalMinutes = callsPerMonth * avgCallDuration;
    const totalHours = totalMinutes / 60;
    const currentCost = totalHours * costPerHour;
    const aiCost = callsPerMonth * 0.15; // $0.15 per call average
    const savings = currentCost - aiCost;
    const savingsPercent = ((savings / currentCost) * 100).toFixed(0);
    
    return {
      currentCost: Math.round(currentCost),
      aiCost: Math.round(aiCost),
      monthlySavings: Math.round(savings),
      yearlySavings: Math.round(savings * 12),
      savingsPercent,
    };
  }, [callsPerMonth, avgCallDuration, costPerHour]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-enterprise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">ROI Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Calculate Your Savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much you could save by switching to AI voice agents.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="glass-card rounded-3xl p-8 animate-fade-up">
              <h3 className="text-xl font-display font-bold text-foreground mb-8">
                Your Current Operations
              </h3>
              
              <div className="space-y-8">
                {/* Calls per month */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Calls per month
                    </label>
                    <span className="text-sm text-primary font-semibold">
                      {callsPerMonth.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={callsPerMonth}
                    onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>500</span>
                    <span>50,000</span>
                  </div>
                </div>

                {/* Avg call duration */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Avg. call duration (minutes)
                    </label>
                    <span className="text-sm text-primary font-semibold">
                      {avgCallDuration} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={avgCallDuration}
                    onChange={(e) => setAvgCallDuration(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 min</span>
                    <span>30 min</span>
                  </div>
                </div>

                {/* Cost per hour */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Cost per agent hour ($)
                    </label>
                    <span className="text-sm text-primary font-semibold">
                      ${costPerHour}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={costPerHour}
                    onChange={(e) => setCostPerHour(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$10</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {/* Savings highlight */}
              <div className="glass-card rounded-3xl p-8 border-success/30 bg-success/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-4xl font-display font-bold text-success">
                      ${calculations.monthlySavings.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  That's <span className="text-success font-semibold">{calculations.savingsPercent}%</span> less than your current costs
                </p>
              </div>

              {/* Comparison cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Current Cost</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    ${calculations.currentCost.toLocaleString()}/mo
                  </p>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">With AI</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-primary">
                    ${calculations.aiCost.toLocaleString()}/mo
                  </p>
                </div>
              </div>

              {/* Yearly projection */}
              <div className="glass-card rounded-2xl p-6 border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Yearly Savings Projection</p>
                <p className="text-3xl font-display font-bold text-gradient">
                  ${calculations.yearlySavings.toLocaleString()}
                </p>
              </div>

              {/* CTA */}
              <Button asChild variant="hero" size="xl" className="w-full">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Start Saving Today
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { MapPin, Phone, Calendar, CheckCircle } from "lucide-react";

const activities = [
  { name: "John", city: "New York", action: "scheduled a demo", icon: Calendar },
  { name: "Sarah", city: "London", action: "started a free trial", icon: CheckCircle },
  { name: "Michael", city: "Singapore", action: "upgraded to Enterprise", icon: CheckCircle },
  { name: "Emily", city: "San Francisco", action: "scheduled a demo", icon: Calendar },
  { name: "David", city: "Mumbai", action: "completed onboarding", icon: CheckCircle },
  { name: "Lisa", city: "Berlin", action: "requested a callback", icon: Phone },
  { name: "James", city: "Toronto", action: "scheduled a demo", icon: Calendar },
  { name: "Anna", city: "Sydney", action: "started a free trial", icon: CheckCircle },
];

const getRandomTime = () => {
  const mins = Math.floor(Math.random() * 15) + 1;
  return `${mins} min ago`;
};

export const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedActivity, setDisplayedActivity] = useState(activities[0]);

  useEffect(() => {
    // Initial delay before showing first notification
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      // Hide current notification
      setIsVisible(false);
      
      // After hide animation, update and show next
      setTimeout(() => {
        const nextIndex = (currentActivity + 1) % activities.length;
        setCurrentActivity(nextIndex);
        setDisplayedActivity(activities[nextIndex]);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentActivity, isVisible]);

  const activity = displayedActivity;
  const Icon = activity.icon;

  return (
    <div 
      className={`fixed bottom-24 left-4 z-40 transition-all duration-500 ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-full"
      }`}
    >
      <div className="glass-card rounded-2xl p-4 pr-6 shadow-xl border border-border/50 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-snug">
              <span className="font-semibold">{activity.name}</span>
              {" from "}
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                {activity.city}
              </span>
              {" "}
              {activity.action}
            </p>
            <span className="text-xs text-muted-foreground">{getRandomTime()}</span>
          </div>
        </div>
        
        {/* Dismiss button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

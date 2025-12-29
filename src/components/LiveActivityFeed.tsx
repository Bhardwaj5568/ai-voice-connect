import { useEffect, useState } from "react";
import { MapPin, Phone, Calendar, CheckCircle } from "lucide-react";

const names = [
  // North America
  "James", "Emily", "Michael", "Sarah", "David", "Jessica", "Christopher", "Ashley",
  // Europe
  "Liam", "Emma", "Oliver", "Sophie", "Lucas", "Isabella", "Matteo", "Giulia",
  "Hans", "Ingrid", "Pierre", "Camille", "Andrei", "Elena", "Sven", "Astrid",
  // Asia
  "Hiroshi", "Yuki", "Wei", "Mei", "Raj", "Priya", "Jin", "Soo-Min",
  "Arjun", "Ananya", "Kenji", "Sakura", "Chen", "Li Na", "Vikram", "Deepa",
  // Middle East
  "Omar", "Fatima", "Khalid", "Layla", "Ahmed", "Noor", "Hassan", "Mariam",
  // Latin America
  "Carlos", "Maria", "Diego", "Valentina", "Mateo", "Camila", "Santiago", "Lucia",
  // Africa
  "Kwame", "Amina", "Kofi", "Zara", "Tendai", "Aisha", "Oluwaseun", "Nkechi",
  // Oceania
  "Jack", "Charlotte", "William", "Olivia", "Lachlan", "Mia", "Ethan", "Ava",
];

const locations = [
  // North America
  { city: "New York", country: "USA" },
  { city: "Los Angeles", country: "USA" },
  { city: "Toronto", country: "Canada" },
  { city: "Chicago", country: "USA" },
  { city: "Vancouver", country: "Canada" },
  { city: "Miami", country: "USA" },
  { city: "Mexico City", country: "Mexico" },
  // Europe
  { city: "London", country: "UK" },
  { city: "Paris", country: "France" },
  { city: "Berlin", country: "Germany" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Stockholm", country: "Sweden" },
  { city: "Madrid", country: "Spain" },
  { city: "Milan", country: "Italy" },
  { city: "Dublin", country: "Ireland" },
  { city: "Zurich", country: "Switzerland" },
  // Asia
  { city: "Singapore", country: "Singapore" },
  { city: "Tokyo", country: "Japan" },
  { city: "Mumbai", country: "India" },
  { city: "Hong Kong", country: "China" },
  { city: "Seoul", country: "South Korea" },
  { city: "Bangalore", country: "India" },
  { city: "Shanghai", country: "China" },
  { city: "Dubai", country: "UAE" },
  // Latin America
  { city: "São Paulo", country: "Brazil" },
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Bogotá", country: "Colombia" },
  { city: "Santiago", country: "Chile" },
  // Africa
  { city: "Lagos", country: "Nigeria" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Nairobi", country: "Kenya" },
  { city: "Cairo", country: "Egypt" },
  // Oceania
  { city: "Sydney", country: "Australia" },
  { city: "Melbourne", country: "Australia" },
  { city: "Auckland", country: "New Zealand" },
];

const actions = [
  { text: "scheduled a demo", icon: Calendar },
  { text: "started a free trial", icon: CheckCircle },
  { text: "upgraded to Enterprise", icon: CheckCircle },
  { text: "completed onboarding", icon: CheckCircle },
  { text: "requested a callback", icon: Phone },
  { text: "booked a consultation", icon: Calendar },
  { text: "joined the waitlist", icon: CheckCircle },
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateActivity = () => {
  const name = getRandomItem(names);
  const location = getRandomItem(locations);
  const action = getRandomItem(actions);
  const mins = Math.floor(Math.random() * 15) + 1;
  
  return {
    name,
    city: location.city,
    country: location.country,
    action: action.text,
    icon: action.icon,
    time: `${mins} min ago`,
  };
};

export const LiveActivityFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedActivity, setDisplayedActivity] = useState(generateActivity);

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
        setDisplayedActivity(generateActivity());
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible]);

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
                {activity.city}, {activity.country}
              </span>
              {" "}
              {activity.action}
            </p>
            <span className="text-xs text-muted-foreground">{activity.time}</span>
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

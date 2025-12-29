import { useEffect, useState, useCallback } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Search, 
  Phone, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  DollarSign,
  Building2,
  Zap,
  Users,
  Mail
} from "lucide-react";

const commandGroups = [
  {
    heading: "Quick Actions",
    items: [
      { icon: Phone, label: "Request Demo", href: "#hero", shortcut: "D" },
      { icon: DollarSign, label: "View Pricing", href: "#pricing", shortcut: "P" },
      { icon: MessageSquare, label: "Contact Sales", href: "https://wa.me/917792848355", external: true },
    ],
  },
  {
    heading: "Navigate",
    items: [
      { icon: Zap, label: "Services", href: "#services" },
      { icon: Building2, label: "Industries", href: "#industries" },
      { icon: Users, label: "About Us", href: "#about" },
      { icon: HelpCircle, label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { icon: FileText, label: "Case Studies", href: "#case-studies" },
      { icon: Mail, label: "Contact", href: "mailto:contact@voiceai.agency", external: true },
    ],
  },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      window.open(href, "_blank");
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border/50 rounded-lg transition-all duration-200"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
        <kbd className="ml-2 text-xs bg-background/80 px-1.5 py-0.5 rounded border border-border/50">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandGroups.map((group, groupIndex) => (
            <div key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.label}
                    onSelect={() => handleSelect(item.href, item.external)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">
                        {item.shortcut}
                      </kbd>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {groupIndex < commandGroups.length - 1 && <CommandSeparator />}
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

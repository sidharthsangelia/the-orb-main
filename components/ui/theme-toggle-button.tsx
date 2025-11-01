// components/ui/theme-toggle-button.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme || savedTheme === "light" || !["dark", "light", "system"].includes(savedTheme)) {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
      // Debug log
      console.log("Toggle button theme:", localStorage.getItem("theme"), document.documentElement.classList);
    }
  }, [mounted, setTheme]);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
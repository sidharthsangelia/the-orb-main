import React, { useState, useEffect, useRef } from 'react';

// NumberTicker component (Magic UI implementation)
type NumberTickerProps = {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  startValue?: number;
};

const NumberTicker = ({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
}: NumberTickerProps) => {
  const [count, setCount] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = direction === "up" 
        ? (value - startValue) / (duration / 16)
        : (startValue - value) / (duration / 16);
      let current = startValue;
      
      const counter = setInterval(() => {
        if (direction === "up") {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        } else {
          current -= increment;
          if (current <= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, value, direction, delay, startValue]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces 
      })}
    </span>
  );
};

// Enhanced StatItems component with NumberTicker
type StatItemsProps = {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
};

export const StatItems = ({ value, label, icon: Icon, delay = 0 }: StatItemsProps) => {
  return (
    <div className="relative group text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-500 hover:scale-105">
        
        {/* Icon */}
        <div className="p-3 bg-primary/10 rounded-xl mb-3 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {/* Number */}
        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
          <NumberTicker value={value} delay={delay} />+
        </div>

        {/* Label */}
        <div className="text-xs sm:text-sm text-muted-foreground font-medium">
          {label}
        </div>
      </div>
    </div>
  );
};

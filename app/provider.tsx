"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface TimeContextType {
  currentTime: string;
  username: string;
}

const TimeContext = createContext<TimeContextType>({
  currentTime: "",
  username: "Wisitt"
});

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(0, 19).replace("T", " "));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  if (currentTime === null) {
    return null; // Optionally, render a loading indicator here
  }

  
  return (
    <TimeContext.Provider value={{ currentTime, username: "Wisitt" }}>
    {children}
    </TimeContext.Provider>
  );
}

export const useTime = () => useContext(TimeContext);
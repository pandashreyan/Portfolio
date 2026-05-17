
"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading"; // Adjusted path

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  // Hide loader after a short delay to simulate loading completion
  // In a real app, this would be driven by actual loading status (e.g., data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Example delay
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading progress
  useEffect(() => {
      if (isLoading) {
          const interval = setInterval(() => {
              setLoading(prev => {
                  const next = prev + Math.random() * 20;
                  if (next >= 100) {
                      clearInterval(interval);
                      return 100;
                  }
                  return next;
              });
          }, 200); // Adjust interval for smoother loading
          return () => clearInterval(interval);
      }
  }, [isLoading]);


  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      {/* Render children immediately, Loading component overlays */}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

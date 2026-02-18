"use client";

import { useEffect } from "react";
import { useWeather } from "@/hooks/useWeather";
import SearchBar from "@/components/weather/SearchBar";
import CurrentWeather from "@/components/weather/CurrentWeather";
import { Loader2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import WeatherSkeleton from "@/components/ui/WeatherSkeleton";

export default function Home() {
  const { currentWeather, fetchWeather, isLoading, error } = useWeather();
  const { savedLocations } = useStore();

  useEffect(() => {
    // Initial fetch logic
    if (!currentWeather) {
      if (savedLocations.length > 0) {
        // Use first saved location if available
        fetchWeather(savedLocations[0]);
      } else if (navigator.geolocation) {
        // Try geolocation
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // We need to fetch by coords, but fetchByCoords is available from useWeather
            // requires importing it or exposing it. 
            // actually useWeather returns fetchByCoords.
            // But we can't call it easily inside this effect without adding it to dependency array which might loop.
            // Let's just handle it via a separate effect or just leave it empty and let user search.
          },
          (error) => {
            // If denied or error, do nothing. User sees empty state.
          }
        );
      }
    }
  }, []); // Run once on mount

  // Actually, we can just leave it empty and show a designated "Start by searching" UI 
  // if no weather data is present. This is cleaner and follows "remove default" request.

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Aether Weather
        </h1>
        <p className="text-white/60">Experience weather with clarity</p>
      </div>

      <SearchBar />

      <div className="w-full max-w-4xl min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <WeatherSkeleton />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center backdrop-blur-md">
            <p className="text-red-200">{error}</p>
          </div>
        ) : currentWeather ? (
          <CurrentWeather data={currentWeather} />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/50 space-y-4 py-20">
            <div className="p-6 bg-white/5 rounded-full backdrop-blur-lg border border-white/10">
              <Loader2 className="w-12 h-12 text-white/50 animate-spin" />
            </div>
            <p className="text-xl font-light">Search for a city to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}

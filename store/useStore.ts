import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherResponse } from "@/types/weather";

interface SettingsState {
    unit: "m" | "f"; // m = metric (C, km/h), f = imperial (F, mph) - Weatherstack uses 'm', 'f', 's' (scientific)
    toggleUnit: () => void;
}

interface LocationState {
    recentSearches: string[];
    savedLocations: string[];
    addRecentSearch: (city: string) => void;
    toggleSavedLocation: (city: string) => void;
}

interface WeatherState {
    currentWeather: WeatherResponse | null;
    isLoading: boolean;
    error: string | null;
    setWeather: (data: WeatherResponse | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

interface Store extends SettingsState, LocationState, WeatherState { }

export const useStore = create<Store>()(
    persist(
        (set) => ({
            // Settings
            unit: "m",
            toggleUnit: () =>
                set((state) => ({ unit: state.unit === "m" ? "f" : "m" })),

            // Locations
            recentSearches: [],
            savedLocations: [],
            addRecentSearch: (city) =>
                set((state) => {
                    const filtered = state.recentSearches.filter((c) => c !== city);
                    return { recentSearches: [city, ...filtered].slice(0, 5) };
                }),
            toggleSavedLocation: (city) =>
                set((state) => {
                    const exists = state.savedLocations.includes(city);
                    return {
                        savedLocations: exists
                            ? state.savedLocations.filter((c) => c !== city)
                            : [...state.savedLocations, city],
                    };
                }),

            // Weather Data
            currentWeather: null,
            isLoading: false,
            error: null,
            setWeather: (data) => set({ currentWeather: data }),
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
        }),
        {
            name: "weather-app-storage",
            partialize: (state) => ({
                unit: state.unit,
                recentSearches: state.recentSearches,
                savedLocations: state.savedLocations,
            }),
        }
    )
);

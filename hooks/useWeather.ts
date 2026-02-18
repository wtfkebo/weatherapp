import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { getWeather, getHistoricalWeather, getMarineWeather, searchLocations } from "@/services/weatherApi";
import { WeatherResponse, SearchResult } from "@/types/weather";

export function useWeather() {
    const {
        currentWeather,
        isLoading,
        error,
        setWeather,
        setLoading,
        setError,
        addRecentSearch
    } = useStore();

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchWeather = useCallback(async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWeather(query);
            if (data.error) {
                setError(data.error.info);
                setWeather(null);
            } else {
                setWeather(data);
                addRecentSearch(data.location.name);
            }
        } catch (err) {
            setError("Failed to fetch weather data.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setWeather, addRecentSearch]);

    const searchCity = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchLocations(query);
            setSearchResults(results);
        } catch (err) {
            console.error(err);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    const fetchByCoords = useCallback(async (lat: number, lon: number) => {
        const query = `${lat},${lon}`;
        await fetchWeather(query);
    }, [fetchWeather]);

    return {
        currentWeather,
        isLoading,
        error,
        searchResults,
        isSearching,
        fetchWeather,
        searchCity,
        fetchByCoords
    };
}

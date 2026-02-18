import api from "@/lib/axios";
import { WeatherResponse, SearchResult } from "@/types/weather";

export const getWeather = async (query: string): Promise<WeatherResponse> => {
    const response = await api.get<WeatherResponse>(`/current?query=${query}`);
    return response.data;
};

export const getHistoricalWeather = async (
    query: string,
    date: string
): Promise<WeatherResponse> => {
    const response = await api.get<WeatherResponse>(
        `/historical?query=${query}&forecast_days=1&date=${date}`
    );
    return response.data;
};

export const getMarineWeather = async (query: string): Promise<WeatherResponse> => {
    const response = await api.get<WeatherResponse>(`/marine?query=${query}`);
    return response.data;
};

export const searchLocations = async (query: string): Promise<SearchResult[]> => {
    // Weatherstack doesn't have a direct autocomplete endpoint in free tier usually, 
    // but we can try to use the autocomplete endpoint if available or mock it/proxy it.
    // For now, we will simply return the current weather check as a validation of location 
    // or use an external geocoding if needed. 
    // However, the user requirement asks for "Debounced autocomplete search". 
    // We will assume we can hit an autocomplete endpoint or just search.
    // Let's implement a proxy to a search endpoint if weatherstack supports it, 
    // otherwise relying on user input. 
    // NOTE: Weatherstack has an autocomplete endpoint http://api.weatherstack.com/autocomplete

    const response = await api.get<SearchResult[]>(`/autocomplete?query=${query}`);
    return response.data;
};

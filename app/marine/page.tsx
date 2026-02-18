"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { getMarineWeather } from "@/services/weatherApi";
import { WeatherResponse, MarineWeather } from "@/types/weather";
import MarineWeatherCard from "@/components/weather/MarineWeatherCard";
import GlassCard from "@/components/ui/GlassCard";
import SearchBar from "@/components/weather/SearchBar";
import { Loader2 } from "lucide-react";

export default function MarinePage() {
    const { currentWeather } = useStore();
    const [data, setData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState(currentWeather?.location.name || "New York");

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMarineWeather(city);
            if (res.error) {
                setError(res.error.info);
                setData(null);
            } else {
                setData(res);
            }
        } catch (err) {
            setError("Failed to fetch marine data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city]);

    return (
        <div className="flex flex-col gap-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Marine Weather</h1>
                    <p className="text-white/60">Ocean conditions and tides</p>
                </div>
                <SearchBar onSearch={setCity} className="w-full md:w-64" />
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-white/50" />
                </div>
            ) : error ? (
                <GlassCard className="text-center py-10 text-red-200 bg-red-500/10 border-red-500/20">
                    {error}
                </GlassCard>
            ) : data && data.historical ? (
                <div className="space-y-6">
                    {Object.entries(data.historical).map(([date, weather]) => (
                        <div key={date}>
                            <h2 className="text-xl font-semibold mb-4 text-white/80">Forecast for {date}</h2>
                            <MarineWeatherCard data={weather as MarineWeather} />
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

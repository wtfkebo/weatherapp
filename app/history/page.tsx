"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore"; // We might need location from store or separate search
import { getHistoricalWeather } from "@/services/weatherApi";
import { WeatherResponse } from "@/types/weather";
import WeatherChart from "@/components/weather/WeatherChart";
import GlassCard from "@/components/ui/GlassCard";
import SearchBar from "@/components/weather/SearchBar";
import { Loader2, Calendar } from "lucide-react";
import { format, subDays } from "date-fns";

export default function HistoryPage() {
    const { currentWeather, unit } = useStore();
    const [data, setData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState(format(subDays(new Date(), 1), "yyyy-MM-dd"));
    const [city, setCity] = useState(currentWeather?.location.name || "New York");

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getHistoricalWeather(city, date);
            if (res.error) {
                setError(res.error.info);
                setData(null);
            } else {
                setData(res);
            }
        } catch (err) {
            setError("Failed to fetch historical data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city, date]);

    const handleSearch = (query: string) => {
        setCity(query);
    };

    return (
        <div className="flex flex-col gap-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Historical Weather</h1>
                    <p className="text-white/60">Analyze past weather trends</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <SearchBar onSearch={handleSearch} className="w-full md:w-64" />
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
                        <input
                            type="date"
                            value={date}
                            max={format(subDays(new Date(), 1), "yyyy-MM-dd")}
                            onChange={(e) => setDate(e.target.value)}
                            className="h-12 pl-10 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>
                </div>
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
                    {Object.entries(data.historical).map(([dateKey, history]) => (
                        <div key={dateKey} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <GlassCard className="flex flex-col items-center justify-center">
                                    <span className="text-white/60 text-sm">Average Temp</span>
                                    <span className="text-3xl font-bold">{history.avgtemp}°C</span>
                                </GlassCard>
                                <GlassCard className="flex flex-col items-center justify-center">
                                    <span className="text-white/60 text-sm">Max Temp</span>
                                    <span className="text-3xl font-bold">{history.maxtemp}°C</span>
                                </GlassCard>
                                <GlassCard className="flex flex-col items-center justify-center">
                                    <span className="text-white/60 text-sm">Min Temp</span>
                                    <span className="text-3xl font-bold">{history.mintemp}°C</span>
                                </GlassCard>
                            </div>

                            {history.astro && (
                                <GlassCard className="flex justify-around items-center py-6">
                                    <div className="text-center">
                                        <span className="block text-white/50 text-xs uppercase">Sunrise</span>
                                        <span className="text-xl">{history.astro.sunrise}</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-white/50 text-xs uppercase">Sunset</span>
                                        <span className="text-xl">{history.astro.sunset}</span>
                                    </div>
                                </GlassCard>
                            )}

                            {history.hourly && <WeatherChart data={history.hourly} unit={unit} />}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

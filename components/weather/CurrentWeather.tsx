import React from "react";
import { useStore } from "@/store/useStore";
import { WeatherResponse } from "@/types/weather";
import GlassCard from "@/components/ui/GlassCard";
import { Wind, Droplets, Sun, Eye, Thermometer, Gauge } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CurrentWeatherProps {
    data: WeatherResponse;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
    const { current, location } = data;
    const { unit } = useStore();

    if (!current) return null;

    const isMetric = unit === "m";
    const tempUnit = isMetric ? "°C" : "°F";
    const speedUnit = isMetric ? "km/h" : "mph";

    // Weatherstack returns metric by default? 
    // Free tier only supports Metric unless specified?
    // Actually the response depends on the 'units' param in API request.
    // My API route doesn't pass 'units' param, so it defaults to 'm' (Metric).
    // If we want to support switching, we should handle conversion on client 
    // OR pass unit to API. Since API might be cached or limited, 
    // client side conversion is better for instant toggle.
    // Weatherstack 'm' is Celsius, 'f' is Fahrenheit.
    // For this demo, let's assume the API returns Metric (which is default usually) 
    // and we convert if needed, OR we just display what we get if we can't change it easily without refetch.
    // Let's implement client-side conversion for instant feedback.

    const displayTemp = isMetric ? current.temperature : (current.temperature * 9 / 5) + 32;
    const displayFeelsLike = isMetric ? current.feelslike : (current.feelslike * 9 / 5) + 32;
    const displayWind = isMetric ? current.wind_speed : current.wind_speed * 0.621371;
    // Note: basic conversion for demo.

    const details = [
        { icon: Wind, label: "Wind", value: `${Math.round(displayWind)} ${speedUnit}`, sub: current.wind_dir },
        { icon: Droplets, label: "Humidity", value: `${current.humidity}%`, sub: `Precip: ${current.precip}mm` },
        { icon: Gauge, label: "Pressure", value: `${current.pressure} mb` },
        { icon: Sun, label: "UV Index", value: current.uv_index },
        { icon: Eye, label: "Visibility", value: `${current.visibility} km` },
        { icon: Thermometer, label: "Feels Like", value: `${Math.round(displayFeelsLike)}${tempUnit}` },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Card */}
                <GlassCard className="flex flex-col justify-between items-center text-center py-10 md:py-12" hoverEffect>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight">{location.name}</h2>
                        <p className="text-white/70 mt-1">{location.region}, {location.country}</p>
                        <p className="text-sm text-white/50 mt-1">Local Time: {location.localtime.split(' ')[1]}</p>
                    </motion.div>

                    <div className="my-8 relative">
                        <div className="flex flex-col items-center">
                            {/* Weather Icon */}
                            {current.weather_icons[0] && (
                                <div className="mb-4 relative w-24 h-24 drop-shadow-2xl">
                                    <Image
                                        src={current.weather_icons[0]}
                                        alt={current.weather_descriptions[0]}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <h1 className="text-8xl font-thin tracking-tighter text-shadow">
                                {Math.round(displayTemp)}<span className="text-4xl align-top font-normal">{tempUnit}</span>
                            </h1>
                            <p className="text-xl font-medium mt-2 bg-white/20 px-4 py-1 rounded-full">{current.weather_descriptions[0]}</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {details.map((item, idx) => (
                        <GlassCard key={idx} className="flex flex-col items-center justify-center p-4 hover:bg-white/10 transition-colors" hoverEffect>
                            <item.icon className="w-6 h-6 text-white/80 mb-2" />
                            <span className="text-white/60 text-xs uppercase tracking-wider">{item.label}</span>
                            <span className="text-xl font-semibold mt-1">{item.value}</span>
                            {item.sub && <span className="text-xs text-white/40 mt-1">{item.sub}</span>}
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

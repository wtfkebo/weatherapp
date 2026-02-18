import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Waves, Anchor, Navigation, Clock } from "lucide-react";
import { MarineWeather } from "@/types/weather";

interface MarineWeatherCardProps {
    data: MarineWeather;
}

export default function MarineWeatherCard({ data }: MarineWeatherCardProps) {
    if (!data) return null;

    return (
        <GlassCard className="w-full">
            <div className="flex items-center gap-3 mb-6">
                <Waves className="w-6 h-6 text-cyan-300" />
                <h3 className="text-xl font-bold">Marine Conditions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Tides */}
                <div className="col-span-full md:col-span-2 bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Tides
                    </h4>
                    <div className="space-y-2">
                        {data.tides && data.tides.length > 0 ? (
                            data.tides.map((tide, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-1 last:border-0 last:pb-0">
                                    <span className="text-white/90">{tide.tide_time}</span>
                                    <span className="font-semibold text-cyan-200">{tide.tide_type}</span>
                                    <span className="text-white/60">{tide.tide_height_mt}m</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-white/40">No tide data available</p>
                        )}

                    </div>
                </div>

                {/* Additional Marine Info mockups since API might not return full wave data in basic response */}
                <div className="bg-white/5 rounded-xl p-4 flex flex-col justify-center items-center">
                    <Anchor className="w-8 h-8 text-white/40 mb-2" />
                    <span className="text-white/60 text-sm">Water Temp</span>
                    <span className="text-lg font-bold">--°C</span>
                </div>

                <div className="bg-white/5 rounded-xl p-4 flex flex-col justify-center items-center">
                    <Navigation className="w-8 h-8 text-white/40 mb-2" />
                    <span className="text-white/60 text-sm">Swell Dir</span>
                    <span className="text-lg font-bold">--</span>
                </div>

            </div>
        </GlassCard>
    );
}

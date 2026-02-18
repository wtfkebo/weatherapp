"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { format, parseISO } from "date-fns";
import { HourlyWeather } from "@/types/weather";

interface WeatherChartProps {
    data: HourlyWeather[];
    unit: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl text-white">
                <p className="text-sm font-medium mb-1">{label}</p>
                <p className="text-sm font-bold text-sky-300">
                    Temp: {payload[0].value}°
                </p>
                <p className="text-xs text-white/60">
                    Wind: {payload[0].payload.wind_speed} km/h
                </p>
                <p className="text-xs text-white/60">
                    Precip: {payload[0].payload.precip}%
                </p>
            </div>
        );
    }
    return null;
};

export default function WeatherChart({ data, unit }: WeatherChartProps) {
    // Format data for chart
    // Weatherstack hourly 'time' is usually "0", "300", "1200" (military time as string??) or "12:00 PM"
    // It varies. Type definition says string.
    // Standard Weatherstack historical hourly time is "0", "300", ... "2100".

    const chartData = data.map((item, index) => {
        // Attempt to format time label
        let label = item.time;
        // If it's like "0", "100", make it readable
        if (/^\d+$/.test(item.time)) {
            const timeNum = parseInt(item.time);
            const hours = Math.floor(timeNum / 100);
            const mins = timeNum % 100;
            label = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        }

        return {
            name: label,
            temp: item.temperature,
            ...item
        };
    });

    return (
        <GlassCard className="w-full h-[400px] flex flex-col">
            <h3 className="text-xl font-semibold mb-6 pl-2">Hourly Temperature Trend</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            unit="°"
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#38bdf8"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}

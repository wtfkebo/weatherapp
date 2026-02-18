import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface SearchBarProps {
    onSearch?: (query: string) => void;
    className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const { searchCity, searchResults, isSearching, fetchWeather, fetchByCoords } = useWeather();
    const [showResults, setShowResults] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const { savedLocations } = useStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce search
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            if (value.length > 2) {
                searchCity(value);
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        }, 500);
    };

    const handleSelectCity = (city: string) => {
        setQuery(city);
        setShowResults(false);
        fetchWeather(city);
        if (onSearch) onSearch(city);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSelectCity(query);
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchByCoords(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve your location");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    return (
        <div ref={searchRef} className={cn("relative w-full max-w-md z-50", className)}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search city..."
                    className="w-full h-12 pl-12 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-md"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />

                <button
                    onClick={handleLocationClick}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title="Use my location"
                >
                    <MapPin className="w-5 h-5 text-white/80" />
                </button>
            </div>

            {/* Autocomplete Results */}
            {showResults && (query.length > 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto">
                    {isSearching ? (
                        <div className="p-4 flex justify-center">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                    ) : searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li
                                    key={`${result.id || index}-${result.name}`}
                                    onClick={() => handleSelectCity(result.name)}
                                    className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white flex justify-between items-center transition-colors border-b border-white/5 last:border-0"
                                >
                                    <span>{result.name}, {result.country}</span>
                                    <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded">{result.region}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            <li
                                onClick={() => handleSelectCity(query)}
                                className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white flex gap-3 items-center transition-colors"
                            >
                                <Search className="w-4 h-4 text-white/50" />
                                <span>Search for "{query}"</span>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

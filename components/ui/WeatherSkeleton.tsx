import GlassCard from "@/components/ui/GlassCard";

export default function WeatherSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Card Skeleton */}
                <GlassCard className="flex flex-col justify-between items-center text-center py-10 md:py-12 h-[400px]">
                    <div className="h-8 w-48 bg-white/10 rounded-full mb-2" />
                    <div className="h-4 w-32 bg-white/10 rounded-full mb-8" />

                    <div className="h-24 w-24 bg-white/10 rounded-full mb-4" />
                    <div className="h-20 w-40 bg-white/10 rounded-xl mb-4" />
                    <div className="h-6 w-24 bg-white/10 rounded-full" />
                </GlassCard>

                {/* Details Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <GlassCard key={i} className="flex flex-col items-center justify-center p-4 h-32">
                            <div className="h-6 w-6 bg-white/10 rounded-full mb-2" />
                            <div className="h-3 w-16 bg-white/10 rounded-full mb-2" />
                            <div className="h-6 w-20 bg-white/10 rounded-full" />
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)" } : undefined}
                transition={{ duration: 0.3 }}
                className={cn(
                    "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 text-white relative overflow-hidden",
                    className
                )}
                {...props}
            >
                <div className="relative z-10">{children}</div>
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;

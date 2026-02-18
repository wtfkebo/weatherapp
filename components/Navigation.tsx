"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CloudSun, History, Anchor, Settings } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Weather", icon: CloudSun },
        { href: "/history", label: "History", icon: History },
        { href: "/marine", label: "Marine", icon: Anchor },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                                isActive
                                    ? "bg-white text-blue-900 font-medium shadow-lg"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <link.icon className="w-5 h-5" />
                            <span className={cn("hidden md:inline", isActive && "inline")}>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

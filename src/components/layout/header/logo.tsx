"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { transitions } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        "flex items-center gap-2.5 group",
        transitions.colors,
        "hover:opacity-90 active:opacity-80",
        className
      )}
      aria-label="eCommerce Shop - Home"
    >
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <ShoppingBag 
          className="relative h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-primary" 
          aria-hidden="true"
          strokeWidth={2}
        />
      </div>
      
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-sm sm:text-xl lg:text-2xl font-bold text-foreground tracking-tight">
          eCommerce
        </span>
        <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-muted-foreground -mt-0.5 tracking-wide">
          Shop
        </span>
      </div>
    </Link>
  );
}

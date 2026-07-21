"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
  pulse?: boolean;
}

const variantStyles = {
  primary:
    "gradient-cta text-white shadow-lg shadow-[#FF8A00]/25 hover:shadow-xl hover:shadow-[#FF8A00]/30 hover:brightness-110",
  secondary:
    "bg-[#1A1A2E] text-white hover:bg-[#2D2D4E] shadow-md",
  outline:
    "bg-white text-[#1A1A2E] border-2 border-[#E5E7EB] hover:border-[#FF8A00] hover:text-[#FF8A00]",
  ghost:
    "bg-transparent text-[#6B7280] hover:text-[#FF8A00] hover:bg-[#FFF7ED]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5 font-semibold",
  xl: "px-10 py-5 text-xl rounded-2xl gap-3 font-bold",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  fullWidth = false,
  className,
  pulse = false,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        pulse && "pulse-glow",
        className
      )}
      {...(props as any)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}

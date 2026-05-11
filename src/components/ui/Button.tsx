// Tidak perlu 'use client', Button bisa dipakai di server.
// onClick handler diteruskan via props.

import { type ButtonHTMLAttributes } from "react";

const variantStyles = {
  primary: [
    "bg-blue-600 text-white",
    "hover:bg-blue-700",
    "disabled:bg-blue-300",
  ].join(" "),

  secondary: [
    "bg-white text-gray-700 border border-gray-200",
    "hover:bg-gray-50",
    "disabled:opacity-50",
  ].join(" "),

  danger: [
    "bg-red-600 text-white",
    "hover:bg-red-700",
    "disabled:bg-red-300",
  ].join(" "),

  ghost: [
    "bg-transparent text-gray-600",
    "hover:bg-gray-100 hover:text-gray-900",
    "disabled:opacity-50",
  ].join(" "),
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

// Extend dari HTMLButtonElement agar semua attribute HTML asli bisa dipakai
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        // Base styles
        "inline-flex items-center justify-center gap-2",
        "font-medium rounded-lg",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        // Variant & size styles
        variantStyles[variant],
        sizeStyles[size],
        // Custom className dari luar (untuk override jika perlu)
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

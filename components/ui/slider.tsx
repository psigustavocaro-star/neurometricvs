"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, defaultValue, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {

        // Handle both controlled and uncontrolled state if needed, 
        // but primarily map the array value expected by shadcn/radix patterns 
        // to the single value of a native range input.

        const currentValue = Array.isArray(value) ? value[0] : (typeof value === 'number' ? value : 0)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value)
            if (onValueChange) {
                onValueChange([val])
            }
            // Call original onChange if provided
            props.onChange?.(e);
        }

        return (
            <input
                type="range"
                className={cn(
                    "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50 disabled:pointer-events-none",
                    className
                )}
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={handleChange}
                ref={ref}
                {...props}
            />
        )
    }
)
Slider.displayName = "Slider"

export { Slider }

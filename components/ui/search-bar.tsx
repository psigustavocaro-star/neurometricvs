"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SearchBarProps {
    placeholder?: string
    value: string
    onChange: (value: string) => void
    className?: string
}

export function SearchBar({ placeholder = "Buscar...", value, onChange, className }: SearchBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("relative group", className)}
        >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-teal-600 transition-colors duration-300" />
            </div>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-10 py-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-full transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg focus:bg-white"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </motion.div>
    )
}

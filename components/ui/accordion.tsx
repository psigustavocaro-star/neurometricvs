"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value: string[];
    onValueChange: (value: string) => void;
}>({ value: [], onValueChange: () => { } })

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple", collapsible?: boolean, defaultValue?: string[] }
>(({ className, children, defaultValue = [], ...props }, ref) => {
    const [value, setValue] = React.useState<string[]>(defaultValue)

    const handleValueChange = (itemValue: string) => {
        setValue(prev => {
            if (prev.includes(itemValue)) {
                return prev.filter(v => v !== itemValue)
            } else {
                return [...prev, itemValue]
            }
        })
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("border-b", className)} data-value={value} {...props}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { 'data-value': value } as any)
                }
                return child
            })}
        </div>
    )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { 'data-value'?: string }
>(({ className, children, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(AccordionContext)
    const itemValue = props['data-value'] || ''
    const isOpen = value.includes(itemValue)

    return (
        <button
            ref={ref}
            onClick={() => onValueChange(itemValue)}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
            type="button"
        >
            {children}
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { 'data-value'?: string }
>(({ className, children, ...props }, ref) => {
    const { value } = React.useContext(AccordionContext)
    const itemValue = props['data-value'] || ''
    const isOpen = value.includes(itemValue)

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all pb-4 pt-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

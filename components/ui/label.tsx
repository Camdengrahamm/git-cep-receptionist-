import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Minimal replacement for Radix's Label.
 * Keeps the same API used across the project (`className`, `...props`).
 */
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
)
Label.displayName = "Label"

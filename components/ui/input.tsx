import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[50px] w-full rounded-[6px] border border-[#1B2231] bg-[#0C141C] px-4 py-1 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent placeholder:text-[14px] file:text-sm file:font-medium file:text-foreground placeholder:text-[#8F9DAC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

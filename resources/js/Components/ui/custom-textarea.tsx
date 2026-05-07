import { Textarea, type TextareaProps } from "@headlessui/react";
import * as React from "react";
import { cn } from "@/lib/utils";

export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <Textarea
                ref={ref}
                data-slot="input"
                className={cn(
                    "border-input file:text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring focus:ring-offset-ring",
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    className
                )}
                {...props}
            />
        );
    }
);

CustomTextarea.displayName = "CustomTextarea";
/**
 * Select Component
 *
 * A reusable native select component with variants and sizes.
 * Built with CVA + Tailwind for consistent design system usage.
 *
 * @example
 *
 * <Select>
 *   <SelectItem value="1">Wallet 1</SelectItem>
 * </Select>
 */

import * as React from "react";
import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------------------
   Select Variants
--------------------------------------------- */

const selectVariants = cva(
	// Base classes
	"flex w-full appearance-none rounded-md border bg-background text-sm transition-colors outline-none placeholder:text-muted-foreground",
	{
		variants: {
			variant: {
				default: "border-input focus:border-ring focus:ring-2 focus:ring-ring/30",
				error: "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30",
				success: "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30",
				ghost: "border-transparent bg-muted focus:border-ring focus:ring-2 focus:ring-ring/20",
			},
			size: {
				sm: "h-8 px-2 text-xs",
				md: "h-10 px-3 text-sm",
				lg: "h-12 px-4 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

/* ---------------------------------------------
   Select Props
--------------------------------------------- */

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
	VariantProps<typeof selectVariants>;

/* ---------------------------------------------
   Select Component
--------------------------------------------- */

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, variant, size, children, ...props }, ref) => {
		return (
			<div className="relative w-full">
				<select ref={ref} className={cn(selectVariants({ variant, size }), className)} {...props}>
					{children}
				</select>

				{/* Dropdown Icon */}
				<ChevronDownIcon
					className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-60"
					aria-hidden="true"
				/>
			</div>
		);
	}
);

Select.displayName = "Select";

/* ---------------------------------------------
   Select Item (Option)
--------------------------------------------- */

export type SelectItemProps = React.OptionHTMLAttributes<HTMLOptionElement>;

const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(
	({ className, children, ...props }, ref) => {
		return (
			<option ref={ref} className={cn("text-foreground", className)} {...props}>
				{children}
			</option>
		);
	}
);

SelectItem.displayName = "SelectItem";

/* ---------------------------------------------
   Exports
--------------------------------------------- */

export { Select, SelectItem, selectVariants };

/**
 * Input Component
 *
 * A reusable input component with variants and sizes.
 * Includes support for error states, disabled styles, and accessibility.
 *
 * @example
 * <Label>Email</Label>
 * <Input placeholder="Enter your email" />
 */

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* ---------------------------------------------
   Input Variants
--------------------------------------------- */

const inputVariants = cva(
	// Base classes
	"flex w-full rounded-md border bg-background text-sm transition-colors outline-none placeholder:text-muted-foreground",
	{
		variants: {
			variant: {
				default: "border-input focus:border-ring focus:ring-2 focus:ring-ring/30",
				error: "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30",
				success: "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30",
				ghost: "border-transparent bg-muted focus:border-ring focus:ring-2 focus:ring-ring/20",
			},
			inputSize: {
				sm: "h-8 px-2 text-xs",
				md: "h-10 px-3 text-sm",
				lg: "h-12 px-4 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			inputSize: "md",
		},
	}
);

/* ---------------------------------------------
   Input Props
--------------------------------------------- */
export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}
/* ---------------------------------------------
   Input Component
--------------------------------------------- */

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, inputSize, type = "text", ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(inputVariants({ variant, inputSize }), className)}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";

/* ---------------------------------------------
   Exports
--------------------------------------------- */

export { Input, inputVariants };

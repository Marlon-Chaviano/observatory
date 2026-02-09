/**
 * Label Component
 *
 * A reusable label component with variants and sizes.
 * Includes support for error states, disabled styles, and accessibility.
 *
 * @example
 * <Label>Email</Label>
 */

import { forwardRef } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* ---------------------------------------------
   Label Variants
--------------------------------------------- */

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			variant: {
				default: "text-foreground",
				muted: "text-muted-foreground",
				error: "text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

/* ---------------------------------------------
   Label Component
--------------------------------------------- */

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, ...props }, ref) => {
	return <label ref={ref} className={cn(labelVariants({ variant }), className)} {...props} />;
});

Label.displayName = "Label";

export { Label, labelVariants };

/* ---------------------------------------------*/

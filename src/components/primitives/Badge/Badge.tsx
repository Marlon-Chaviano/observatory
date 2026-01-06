/**
 * Badge Component
 *
 * A versatile badge component with multiple variants using CVA.
 *
 * @example
 * <Badge variant="default">New</Badge>
 * <Badge variant="destructive" size="lg">Error</Badge>
 */

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	// Base classes - always applied
	"inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
				success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
				info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
				outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				xs: "px-2 py-0.5 text-xs",
				sm: "px-2.5 py-0.5 text-xs",
				md: "px-3 py-1 text-sm",
				lg: "px-4 py-1.5 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
	/**
	 * Whether the badge should be displayed as a dot (no text)
	 */
	dot?: boolean;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant, size, dot, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(badgeVariants({ variant, size }), className)}
				role={dot ? "status" : undefined}
				aria-label={dot ? "Status indicator" : undefined}
				{...props}
			>
				{dot ? <span className="h-2 w-2 rounded-full bg-current" /> : children}
			</div>
		);
	}
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };

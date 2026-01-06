/**
 * Button Component
 *
 * A flexible button component with multiple variants, sizes, and states.
 * Built with CVA for type-safe variant management.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="destructive" size="lg" disabled>Delete</Button>
 */

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	// Base classes - always applied
	"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
				ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
				link: "text-primary underline-offset-4 hover:underline",
				warning: "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/95",
				success: "bg-success text-success-foreground hover:bg-success/90 active:bg-success/95",
			},
			size: {
				xs: "h-7 px-2 text-xs",
				sm: "h-8 px-3 text-sm",
				md: "h-10 px-4 text-base",
				lg: "h-12 px-6 text-lg",
				xl: "h-14 px-8 text-xl",
				icon: "h-10 w-10",
				"icon-sm": "h-8 w-8",
				"icon-lg": "h-12 w-12",
			},
			fullWidth: {
				true: "w-full",
				false: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			fullWidth: false,
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	/**
	 * Loading state - shows spinner and disables button
	 */
	loading?: boolean;
	/**
	 * Icon to display before the button text
	 */
	leftIcon?: React.ReactNode;
	/**
	 * Icon to display after the button text
	 */
	rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			fullWidth,
			loading,
			disabled,
			leftIcon,
			rightIcon,
			children,
			...props
		},
		ref
	) => {
		const isDisabled = disabled || loading;

		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size, fullWidth }), className)}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				aria-busy={loading}
				{...props}
			>
				{loading && (
					<svg
						className="mr-2 h-4 w-4 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
				{children}
				{!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };

/**
 * Alert Component
 *
 * Displays important messages to users with semantic variants.
 * Supports icons and actions.
 *
 * @example
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong</AlertDescription>
 * </Alert>
 */

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
	// Base classes
	"relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground border-border [&>svg]:text-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
				success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
				info: "border-info/50 text-info dark:border-info [&>svg]:text-info",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface AlertProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
	/**
	 * Icon to display in the alert
	 */
	icon?: React.ReactNode;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant, icon, children, ...props }, ref) => {
		return (
			<div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
				{icon}
				{children}
			</div>
		);
	}
);
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		return (
			<h5
				ref={ref}
				className={cn("mb-1 leading-none font-medium tracking-tight", className)}
				{...props}
			/>
		);
	}
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />;
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle, alertVariants };

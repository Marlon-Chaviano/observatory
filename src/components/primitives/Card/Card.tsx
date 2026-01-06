/**
 * Card Component
 *
 * A flexible card component with header, body, and footer sections.
 * Supports multiple variants and padding options.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardBody>Content</CardBody>
 * </Card>
 */

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
	// Base classes
	"rounded-lg border bg-card text-card-foreground transition-shadow",
	{
		variants: {
			variant: {
				default: "shadow-sm",
				elevated: "shadow-lg",
				outlined: "shadow-none",
				interactive:
					"shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-primary/50",
			},
			padding: {
				none: "",
				sm: "p-4",
				md: "p-6",
				lg: "p-8",
			},
		},
		defaultVariants: {
			variant: "default",
			padding: "md",
		},
	}
);

export interface CardProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, padding, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
		);
	}
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
	}
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn("text-2xl leading-none font-semibold tracking-tight", className)}
				{...props}
			/>
		);
	}
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />;
});
CardDescription.displayName = "CardDescription";

const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
	}
);
CardBody.displayName = "CardBody";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
	}
);
CardFooter.displayName = "CardFooter";

export { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants };

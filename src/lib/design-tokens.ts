/**
 * Design Tokens - TypeScript Definitions
 *
 * This file provides type-safe access to design tokens used throughout the application.
 * All tokens are defined in globals.css and can be accessed via CSS variables.
 */

/**
 * Color Tokens
 * Semantic color names that adapt to light/dark mode
 */
export const colors = {
	// Base colors
	background: "bg-background",
	foreground: "text-foreground",

	// Primary colors
	primary: "bg-primary text-primary-foreground",
	primaryForeground: "text-primary-foreground",

	// Secondary colors
	secondary: "bg-secondary text-secondary-foreground",
	secondaryForeground: "text-secondary-foreground",

	// Muted colors
	muted: "bg-muted text-muted-foreground",
	mutedForeground: "text-muted-foreground",

	// Accent colors
	accent: "bg-accent text-accent-foreground",
	accentForeground: "text-accent-foreground",

	// Semantic colors
	destructive: "bg-destructive text-destructive-foreground",
	destructiveForeground: "text-destructive-foreground",
	warning: "bg-warning text-warning-foreground",
	warningForeground: "text-warning-foreground",
	success: "bg-success text-success-foreground",
	successForeground: "text-success-foreground",
	info: "bg-info text-info-foreground",
	infoForeground: "text-info-foreground",

	// UI element colors
	border: "border-border",
	input: "bg-input",
	ring: "ring-ring",
	card: "bg-card text-card-foreground",
	popover: "bg-popover text-popover-foreground",
} as const;

/**
 * Typography Tokens
 */
export const typography = {
	// Font families
	fontSans: "font-sans",
	fontMono: "font-mono",
	fontDisplay: "font-display",
	fontBody: "font-body",
	fontCode: "font-code",

	// Font sizes
	fontSize: {
		xs: "text-xs",
		sm: "text-sm",
		base: "text-base",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl",
		"3xl": "text-3xl",
		"4xl": "text-4xl",
		"5xl": "text-5xl",
		"6xl": "text-6xl",
	},

	// Font weights
	fontWeight: {
		light: "font-light",
		normal: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold",
		extrabold: "font-extrabold",
	},

	// Line heights
	lineHeight: {
		none: "leading-none",
		tight: "leading-tight",
		snug: "leading-snug",
		normal: "leading-normal",
		relaxed: "leading-relaxed",
		loose: "leading-loose",
	},

	// Letter spacing
	letterSpacing: {
		tighter: "tracking-tighter",
		tight: "tracking-tight",
		normal: "tracking-normal",
		wide: "tracking-wide",
		wider: "tracking-wider",
		widest: "tracking-widest",
	},
} as const;

/**
 * Spacing Tokens
 * Based on 4px base unit
 */
export const spacing = {
	0: "p-0",
	1: "p-1", // 4px
	2: "p-2", // 8px
	3: "p-3", // 12px
	4: "p-4", // 16px
	5: "p-5", // 20px
	6: "p-6", // 24px
	8: "p-8", // 32px
	10: "p-10", // 40px
	12: "p-12", // 48px
	16: "p-16", // 64px
	20: "p-20", // 80px
	24: "p-24", // 96px
	32: "p-32", // 128px
	40: "p-40", // 160px
	48: "p-48", // 192px
	64: "p-64", // 256px
} as const;

/**
 * Border Radius Tokens
 */
export const radius = {
	none: "rounded-none",
	sm: "rounded-sm",
	md: "rounded-md",
	base: "rounded",
	lg: "rounded-lg",
	xl: "rounded-xl",
	"2xl": "rounded-2xl",
	"3xl": "rounded-3xl",
	"4xl": "rounded-4xl",
	full: "rounded-full",
} as const;

/**
 * Shadow Tokens
 */
export const shadows = {
	none: "shadow-none",
	xs: "shadow-xs",
	sm: "shadow-sm",
	md: "shadow-md",
	lg: "shadow-lg",
	xl: "shadow-xl",
	"2xl": "shadow-2xl",
	inner: "shadow-inner",
} as const;

/**
 * Z-Index Tokens
 */
export const zIndex = {
	base: "z-0",
	dropdown: "z-[1000]",
	sticky: "z-[1020]",
	fixed: "z-[1030]",
	modalBackdrop: "z-[1040]",
	modal: "z-[1050]",
	popover: "z-[1060]",
	tooltip: "z-[1070]",
} as const;

/**
 * Transition Tokens
 */
export const transitions = {
	fast: "transition-[150ms] ease-in-out",
	base: "transition-[200ms] ease-in-out",
	slow: "transition-[300ms] ease-in-out",
	all: "transition-all duration-200 ease-in-out",
} as const;

/**
 * Component Size Tokens
 * Standard sizes for consistent component scaling
 */
export const sizes = {
	xs: "h-6 px-2 text-xs",
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-4 text-base",
	lg: "h-12 px-6 text-lg",
	xl: "h-14 px-8 text-xl",
} as const;

/**
 * Type exports for better TypeScript support
 */
export type ColorToken = keyof typeof colors;
export type TypographySize = keyof typeof typography.fontSize;
export type TypographyWeight = keyof typeof typography.fontWeight;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadows;
export type SizeToken = keyof typeof sizes;

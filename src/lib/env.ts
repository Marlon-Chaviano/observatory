/**
 * Environment Variables Management
 *
 * Centralized, type-safe environment variable validation using Zod.
 * This ensures all required environment variables are present and valid
 * before the application starts.
 *
 * Security Best Practices:
 * - Never access process.env directly outside this file
 * - All variables are validated at runtime
 * - Clear error messages in development
 * - Type-safe exports
 *
 * Usage:
 * ```ts
 * import { env } from '@/lib/env';
 * const apiUrl = env.NEXT_PUBLIC_API_URL;
 * ```
 */

import { z } from "zod";

/**
 * Environment variable schema
 *
 * Separates public (NEXT_PUBLIC_*) and private (server-only) variables.
 * Public variables are exposed to the browser.
 * Private variables are only available on the server.
 */
const envSchema = z.object({
	// ========================================================================
	// Public Environment Variables (exposed to browser)
	// ========================================================================

	/**
	 * Base URL for the API
	 * Used in both Server and Client Components
	 * @example "https://api.example.com" or "/api" for relative URLs
	 */
	NEXT_PUBLIC_API_URL: z.string().url().or(z.string().startsWith("/")).default("/api"),

	/**
	 * Application name
	 * Used for branding, titles, etc.
	 */
	NEXT_PUBLIC_APP_NAME: z.string().min(1).default("Observatory"),

	/**
	 * Application version
	 * Used for debugging, version display, etc.
	 */
	NEXT_PUBLIC_APP_VERSION: z.string().default("0.1.0"),

	/**
	 * Environment name
	 * Used to determine which environment we're running in
	 * @example "development" | "staging" | "production"
	 */
	NEXT_PUBLIC_ENV: z.enum(["development", "staging", "production"]).default("development"),

	/**
	 * Enable debug mode
	 * Shows additional logging and debugging information
	 */
	NEXT_PUBLIC_DEBUG: z
		.string()
		.optional()
		.transform((val) => val === "true" || val === "1"),

	// ========================================================================
	// Private Environment Variables (server-only)
	// ========================================================================

	/**
	 * Database connection string
	 * NEVER expose this to the client
	 * @example "postgresql://user:password@localhost:5432/dbname"
	 */
	DATABASE_URL: z.string().url().optional(),

	/**
	 * NextAuth secret
	 * Used for encrypting JWT tokens and sessions
	 * Generate with: openssl rand -base64 32
	 */
	NEXTAUTH_SECRET: z.string().min(32).optional(),

	/**
	 * NextAuth URL
	 * Base URL of your application
	 * @example "https://example.com"
	 */
	NEXTAUTH_URL: z.string().url().optional(),

	/**
	 * API key for external services
	 * Example: Stripe, SendGrid, etc.
	 */
	API_KEY: z.string().min(1).optional(),

	/**
	 * Email service configuration
	 * SMTP server URL or service API key
	 */
	EMAIL_SERVICE_URL: z.string().url().optional(),

	/**
	 * Redis connection string (if using Redis)
	 * @example "redis://localhost:6379"
	 */
	REDIS_URL: z.string().url().optional(),

	/**
	 * Sentry DSN for error tracking
	 * @example "https://xxx@xxx.ingest.sentry.io/xxx"
	 */
	SENTRY_DSN: z.string().url().optional(),

	/**
	 * Logging level
	 * @example "debug" | "info" | "warn" | "error"
	 */
	LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

/**
 * Type inference from schema
 * Use this type when you need the environment variable types
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 *
 * This object contains all validated environment variables.
 * Access this instead of process.env directly.
 *
 * @throws {Error} If validation fails, throws a clear error message
 */
function getEnv(): Env {
	// In development, show helpful error messages
	const isDev = process.env.NODE_ENV === "development";

	try {
		return envSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const missingVars = error.errors
				.filter((err) => err.code === "invalid_type" && err.received === "undefined")
				.map((err) => `  - ${err.path.join(".")}: ${err.message}`)
				.join("\n");

			const invalidVars = error.errors
				.filter((err) => err.code !== "invalid_type" || err.received !== "undefined")
				.map((err) => `  - ${err.path.join(".")}: ${err.message}`)
				.join("\n");

			let errorMessage = "\n❌ Invalid environment variables:\n\n";

			if (missingVars) {
				errorMessage += "Missing required variables:\n";
				errorMessage += missingVars;
				errorMessage += "\n\n";
			}

			if (invalidVars) {
				errorMessage += "Invalid variable values:\n";
				errorMessage += invalidVars;
				errorMessage += "\n\n";
			}

			if (isDev) {
				errorMessage += "💡 Tip: Copy .env.example to .env.local and fill in the values.\n";
				errorMessage += "   See .env.example for documentation of each variable.\n\n";
			}

			errorMessage += "For more information, see: src/lib/env.ts\n";

			console.error(errorMessage);
			throw new Error("Invalid environment variables");
		}

		throw error;
	}
}

/**
 * Validated environment variables
 *
 * This is the single source of truth for environment variables.
 * Always import and use this instead of process.env.
 *
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 *
 * // Public variable (available in browser)
 * const apiUrl = env.NEXT_PUBLIC_API_URL;
 *
 * // Private variable (server-only)
 * const dbUrl = env.DATABASE_URL; // Only works in Server Components/API routes
 * ```
 */
export const env = getEnv();

/**
 * Helper to check if we're in a specific environment
 */
export const isDevelopment = env.NEXT_PUBLIC_ENV === "development";
export const isStaging = env.NEXT_PUBLIC_ENV === "staging";
export const isProduction = env.NEXT_PUBLIC_ENV === "production";

/**
 * Helper to check if debug mode is enabled
 */
export const isDebug = env.NEXT_PUBLIC_DEBUG === true;

/**
 * Validate environment variables on module load
 * This ensures we catch missing/invalid variables early
 */
if (typeof window === "undefined") {
	// Server-side: Validate all variables
	getEnv();
} else {
	// Client-side: Only validate public variables
	// This prevents exposing private variables to the browser
	const publicEnvSchema = envSchema.pick({
		NEXT_PUBLIC_API_URL: true,
		NEXT_PUBLIC_APP_NAME: true,
		NEXT_PUBLIC_APP_VERSION: true,
		NEXT_PUBLIC_ENV: true,
		NEXT_PUBLIC_DEBUG: true,
	});

	try {
		publicEnvSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(
				"\n❌ Invalid public environment variables in browser:\n",
				error.errors.map((err) => `  - ${err.path.join(".")}: ${err.message}`).join("\n"),
				"\n"
			);
		}
	}
}

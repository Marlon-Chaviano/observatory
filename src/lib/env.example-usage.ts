/**
 * Environment Variables Usage Examples
 *
 * This file demonstrates how to use the centralized environment variables
 * in different contexts (Server Components, Client Components, API routes).
 *
 * ⚠️  IMPORTANT: Never access process.env directly outside of src/lib/env.ts
 */

// ============================================================================
// Example 1: Using in a Service (Server or Client Component)
// ============================================================================

import { env } from "@/lib/env";

export function exampleService() {
	// ✅ CORRECT: Use validated env variables
	const apiUrl = env.NEXT_PUBLIC_API_URL;
	const appName = env.NEXT_PUBLIC_APP_NAME;

	// ❌ WRONG: Don't access process.env directly
	// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	return {
		apiUrl,
		appName,
	};
}

// ============================================================================
// Example 2: Using in Server Component
// ============================================================================
//
// Note: This is a conceptual example. In a real Server Component file (.tsx),
// you would use JSX. This file is .ts to avoid compilation issues.
//
// In a real Server Component:
// ```tsx
// export default async function ServerComponentExample() {
//   const apiUrl = env.NEXT_PUBLIC_API_URL;
//   const dbUrl = env.DATABASE_URL; // Only available on server
//
//   return (
//     <div>
//       <p>API URL: {apiUrl}</p>
//     </div>
//   );
// }
// ```

// ============================================================================
// Example 3: Using in Client Component
// ============================================================================
//
// Note: This is a conceptual example. In a real Client Component file (.tsx),
// you would use JSX and 'use client' directive.
//
// In a real Client Component:
// ```tsx
// 'use client';
//
// import { env } from '@/lib/env';
//
// export function ClientComponentExample() {
//   const apiUrl = env.NEXT_PUBLIC_API_URL;
//   const appName = env.NEXT_PUBLIC_APP_NAME;
//   const isDebug = env.NEXT_PUBLIC_DEBUG;
//
//   // ❌ WRONG: Private variables don't exist in Client Components
//   // const dbUrl = env.DATABASE_URL; // This will be undefined in browser
//
//   return (
//     <div>
//       <p>App: {appName}</p>
//       <p>API: {apiUrl}</p>
//       {isDebug && <p>Debug mode enabled</p>}
//     </div>
//   );
// }
// ```

// ============================================================================
// Example 4: Using in API Route
// ============================================================================

export async function GET() {
	// ✅ Both public and private variables work in API routes
	const apiUrl = env.NEXT_PUBLIC_API_URL;
	const dbUrl = env.DATABASE_URL;
	const apiKey = env.API_KEY;

	return Response.json({
		apiUrl,
		hasDb: !!dbUrl,
		hasApiKey: !!apiKey,
	});
}

// ============================================================================
// Example 5: Using Environment Helpers
// ============================================================================

import { isDevelopment, isProduction, isDebug } from "@/lib/env";

export function EnvironmentExample() {
	if (isDevelopment) {
		console.log("Running in development mode");
	}

	if (isProduction) {
		// Production-specific logic
	}

	if (isDebug) {
		console.debug("Debug information");
	}

	return null;
}

// ============================================================================
// Example 6: Using in API Client Configuration
// ============================================================================

import { createApiClient } from "@/lib/api/api-client";

// ✅ Use env variables when creating API client instances
export const customApiClient = createApiClient({
	baseURL: env.NEXT_PUBLIC_API_URL,
	getAuthToken: () => {
		// In Client Component, get from localStorage
		if (typeof window !== "undefined") {
			return localStorage.getItem("authToken");
		}
		// In Server Component, get from cookies or headers
		return null;
	},
});

// ============================================================================
// Example 7: Conditional Logic Based on Environment
// ============================================================================

export function getApiEndpoint() {
	const baseUrl = env.NEXT_PUBLIC_API_URL;

	if (isDevelopment) {
		// Development: might use local API
		return `${baseUrl}/dev`;
	}

	if (isProduction) {
		// Production: use production API
		return `${baseUrl}/v1`;
	}

	// Staging: use staging API
	return `${baseUrl}/staging`;
}

// ============================================================================
// Example 8: Error Handling
// ============================================================================

export function safeEnvAccess() {
	try {
		// env.ts validates all variables at module load
		// If a required variable is missing, the app won't start
		const apiUrl = env.NEXT_PUBLIC_API_URL;
		return apiUrl;
	} catch (error) {
		// This catch is for TypeScript, but validation happens at startup
		console.error("Environment variable error:", error);
		return "/api"; // Fallback (though this shouldn't happen)
	}
}

// ============================================================================
// Best Practices Summary
// ============================================================================

/*
✅ DO:
- Always import from '@/lib/env'
- Use the validated env object
- Use environment helpers (isDevelopment, etc.)
- Document why you need each variable

❌ DON'T:
- Access process.env directly
- Put sensitive data in NEXT_PUBLIC_ variables
- Access private variables in Client Components
- Skip validation
*/

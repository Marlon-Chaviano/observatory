/**
 * Global Constants
 *
 * Application-wide constants.
 */

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
	USERS: "/users",
	AUTH: {
		LOGIN: "/auth/login/",
		REGISTER: "/auth/register/",
		LOGOUT: "/auth/logout",
	},
	BILLING: "/billing",
} as const;

/**
 * Cache tags for Next.js revalidation
 */
export const CACHE_TAGS = {
	USERS: "users",
	AUTH: "auth",
	BILLING: "billing",
} as const;

/**
 * Cache revalidation times (in seconds)
 */
export const CACHE_REVALIDATE = {
	SHORT: 60, // 1 minute
	MEDIUM: 3600, // 1 hour
	LONG: 86400, // 24 hours
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
	DEFAULT_PAGE_SIZE: 20,
	MAX_PAGE_SIZE: 100,
} as const;

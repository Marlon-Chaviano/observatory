/**
 * API Client
 *
 * Centralized and scalable API client for Next.js App Router.
 * Compatible with both Server Components and Client Components.
 * Prepared for React Query integration.
 *
 * Features:
 * - Configurable baseURL
 * - Dynamic headers
 * - Optional auth token
 * - Typed error handling
 * - Server/Client Component compatibility
 * - No UI logic
 * - 100% TypeScript
 */

// ============================================================================
// Types
// ============================================================================

/**
 * HTTP Methods supported by the API client
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Request configuration options
 */
export interface RequestConfig extends Omit<RequestInit, "method" | "body"> {
	/**
	 * Custom headers to merge with default headers
	 */
	headers?: HeadersInit;
	/**
	 * Query parameters as object (will be converted to URLSearchParams)
	 */
	params?: Record<string, string | number | boolean | null | undefined>;
	/**
	 * Next.js specific caching options (only works in Server Components)
	 */
	next?: NextFetchRequestConfig;
	/**
	 * Whether to include auth token in request
	 * @default true
	 */
	includeAuth?: boolean;
	/**
	 * Custom timeout in milliseconds
	 */
	timeout?: number;
}

/**
 * Next.js fetch request config for Server Components
 */
export interface NextFetchRequestConfig {
	/**
	 * Revalidate time in seconds
	 */
	revalidate?: number | false;
	/**
	 * Cache tags for revalidation
	 */
	tags?: string[];
	/**
	 * Cache strategy
	 */
	cache?: "force-cache" | "no-store" | "no-cache" | "reload" | "default";
}

/**
 * API Error Response structure
 */
export interface ApiErrorResponse {
	message: string;
	code?: string;
	statusCode?: number;
	errors?: Record<string, string[]>;
	[key: string]: unknown;
}

/**
 * Error types for better error handling
 */
export enum ApiErrorType {
	NETWORK = "NETWORK",
	TIMEOUT = "TIMEOUT",
	CLIENT = "CLIENT", // 4xx
	SERVER = "SERVER", // 5xx
	UNKNOWN = "UNKNOWN",
}

/**
 * Typed API Error class
 */
export class ApiError extends Error {
	readonly type: ApiErrorType;
	readonly status: number;
	readonly code?: string;
	readonly response?: ApiErrorResponse;
	readonly originalError?: Error;

	constructor(
		message: string,
		type: ApiErrorType,
		status: number = 0,
		code?: string,
		response?: ApiErrorResponse,
		originalError?: Error
	) {
		super(message);
		this.name = "ApiError";
		this.type = type;
		this.status = status;
		this.code = code;
		this.response = response;
		this.originalError = originalError;

		// Maintains proper stack trace for where our error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}

	/**
	 * Check if error is a client error (4xx)
	 */
	isClientError(): boolean {
		return this.type === ApiErrorType.CLIENT;
	}

	/**
	 * Check if error is a server error (5xx)
	 */
	isServerError(): boolean {
		return this.type === ApiErrorType.SERVER;
	}

	/**
	 * Check if error is a network error
	 */
	isNetworkError(): boolean {
		return this.type === ApiErrorType.NETWORK;
	}

	/**
	 * Check if error is a timeout
	 */
	isTimeout(): boolean {
		return this.type === ApiErrorType.TIMEOUT;
	}
}

/**
 * API Client configuration
 */
export interface ApiClientConfig {
	/**
	 * Base URL for all API requests
	 */
	baseURL: string;
	/**
	 * Default headers to include in all requests
	 */
	defaultHeaders?: HeadersInit;
	/**
	 * Function to get auth token (called on each request if includeAuth is true)
	 */
	getAuthToken?: () => string | null | Promise<string | null>;
	/**
	 * Custom header name for auth token
	 * @default 'Authorization'
	 */
	authHeaderName?: string;
	/**
	 * Auth token prefix (e.g., 'Bearer')
	 * @default 'Bearer'
	 */
	authTokenPrefix?: string;
	/**
	 * Default timeout in milliseconds
	 * @default 30000 (30 seconds)
	 */
	defaultTimeout?: number;
	/**
	 * Whether we're in a Server Component context
	 * Auto-detected if not provided
	 */
	isServer?: boolean;
}

// ============================================================================
// API Client Class
// ============================================================================

/**
 * Centralized API Client
 *
 * Usage:
 * ```ts
 * const apiClient = new ApiClient({
 *   baseURL: 'https://api.example.com',
 *   getAuthToken: () => localStorage.getItem('token'),
 * });
 *
 * const data = await apiClient.request<User>('GET', '/users/1');
 * ```
 */
export class ApiClient {
	private config: Required<Omit<ApiClientConfig, "getAuthToken" | "defaultHeaders">> &
		Pick<ApiClientConfig, "getAuthToken" | "defaultHeaders">;

	constructor(config: ApiClientConfig) {
		// Validate baseURL
		if (!config.baseURL) {
			throw new Error("ApiClient: baseURL is required");
		}

		// Normalize baseURL (remove trailing slash)
		const baseURL = config.baseURL.replace(/\/$/, "");

		this.config = {
			baseURL,
			defaultHeaders: config.defaultHeaders || {},
			getAuthToken: config.getAuthToken,
			authHeaderName: config.authHeaderName || "Authorization",
			authTokenPrefix: config.authTokenPrefix || "Bearer",
			defaultTimeout: config.defaultTimeout ?? 30000,
			isServer: config.isServer ?? typeof window === "undefined",
		};
	}

	/**
	 * Base request method
	 *
	 * @template T - Response type
	 * @param method - HTTP method
	 * @param endpoint - API endpoint (relative to baseURL)
	 * @param data - Request body (for POST, PUT, PATCH)
	 * @param config - Request configuration
	 * @returns Promise with typed response
	 */
	async request<T>(
		method: HttpMethod,
		endpoint: string,
		data?: unknown,
		config: RequestConfig = {}
	): Promise<T> {
		const {
			headers: customHeaders = {},
			params,
			next,
			includeAuth = true,
			timeout = this.config.defaultTimeout,
			...fetchOptions
		} = config;

		// Build URL
		const url = this.buildURL(endpoint, params);

		// Build headers
		const headers = await this.buildHeaders(customHeaders, includeAuth);

		// Build request body
		const body = this.buildBody(data, method);

		// Build fetch options
		const fetchConfig: RequestInit = {
			...fetchOptions,
			method,
			headers,
			body,
		};

		// Add Next.js specific options for Server Components
		if (this.config.isServer && next) {
			// Next.js extends RequestInit with 'next' property
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(fetchConfig as any).next = next;
		}

		let timeoutId: NodeJS.Timeout | undefined;
		try {
			// Create abort controller for timeout
			const controller = new AbortController();
			timeoutId = setTimeout(() => controller.abort(), timeout);
			fetchConfig.signal = controller.signal;

			// Make request
			const response = await fetch(url, fetchConfig);
			clearTimeout(timeoutId);

			// Handle response
			return await this.handleResponse<T>(response);
		} catch (error) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// Handle errors
			throw this.handleError(error, url);
		}
	}

	/**
	 * GET request
	 */
	async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
		return this.request<T>("GET", endpoint, undefined, config);
	}

	/**
	 * POST request
	 */
	async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
		return this.request<T>("POST", endpoint, data, config);
	}

	/**
	 * PUT request
	 */
	async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
		return this.request<T>("PUT", endpoint, data, config);
	}

	/**
	 * PATCH request
	 */
	async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
		return this.request<T>("PATCH", endpoint, data, config);
	}

	/**
	 * DELETE request
	 */
	async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
		return this.request<T>("DELETE", endpoint, undefined, config);
	}

	// ========================================================================
	// Private Methods
	// ========================================================================

	/**
	 * Build full URL from endpoint and params
	 */
	private buildURL(
		endpoint: string,
		params?: Record<string, string | number | boolean | null | undefined>
	): string {
		// Ensure endpoint starts with /
		const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
		let url = `${this.config.baseURL}${normalizedEndpoint}`;

		// Add query parameters
		if (params && Object.keys(params).length > 0) {
			const searchParams = new URLSearchParams();
			Object.entries(params).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					searchParams.append(key, String(value));
				}
			});
			const queryString = searchParams.toString();
			if (queryString) {
				url += `?${queryString}`;
			}
		}

		return url;
	}

	/**
	 * Build headers for request
	 */
	private async buildHeaders(
		customHeaders: HeadersInit,
		includeAuth: boolean
	): Promise<HeadersInit> {
		const headers = new Headers(this.config.defaultHeaders);

		// Add default Content-Type for requests with body
		if (!headers.has("Content-Type")) {
			headers.set("Content-Type", "application/json");
		}

		// Add auth token if needed
		if (includeAuth && this.config.getAuthToken) {
			const token = await this.config.getAuthToken();
			if (token) {
				const authHeader = this.config.authTokenPrefix
					? `${this.config.authTokenPrefix} ${token}`
					: token;
				headers.set(this.config.authHeaderName, authHeader);
			}
		}

		// Merge custom headers (custom headers take precedence)
		if (customHeaders instanceof Headers) {
			customHeaders.forEach((value, key) => {
				headers.set(key, value);
			});
		} else if (Array.isArray(customHeaders)) {
			customHeaders.forEach(([key, value]) => {
				headers.set(key, value);
			});
		} else {
			Object.entries(customHeaders).forEach(([key, value]) => {
				if (value) {
					headers.set(key, String(value));
				}
			});
		}

		return headers;
	}

	/**
	 * Build request body
	 */
	private buildBody(data: unknown, method: HttpMethod): string | undefined {
		// Only include body for methods that support it
		if (!["POST", "PUT", "PATCH"].includes(method) || data === undefined) {
			return undefined;
		}

		// If data is already a string, return as-is (for FormData, etc.)
		if (typeof data === "string") {
			return data;
		}

		// If data is FormData, URLSearchParams, or Blob, return as-is
		if (data instanceof FormData || data instanceof URLSearchParams || data instanceof Blob) {
			// These types are valid for RequestInit.body
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return data as any;
		}

		// Otherwise, stringify JSON
		return JSON.stringify(data);
	}

	/**
	 * Handle response and parse body
	 */
	private async handleResponse<T>(response: Response): Promise<T> {
		// Handle empty responses (204 No Content, etc.)
		if (response.status === 204 || response.status === 205) {
			return undefined as T;
		}

		// Check if response is ok
		if (!response.ok) {
			const errorData = await this.parseErrorResponse(response);
			throw new ApiError(
				errorData.message || `HTTP error! status: ${response.status}`,
				this.getErrorType(response.status),
				response.status,
				errorData.code,
				errorData
			);
		}

		// Parse response body
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			try {
				return await response.json();
			} catch (error) {
				throw new ApiError(
					"Failed to parse JSON response",
					ApiErrorType.UNKNOWN,
					response.status,
					undefined,
					undefined,
					error instanceof Error ? error : new Error(String(error))
				);
			}
		}

		// Return text response if not JSON
		if (contentType && contentType.includes("text/")) {
			return (await response.text()) as T;
		}

		// Return blob for binary data
		if (
			contentType &&
			(contentType.includes("image/") || contentType.includes("application/octet-stream"))
		) {
			return (await response.blob()) as T;
		}

		// Default: return empty object
		return {} as T;
	}

	/**
	 * Parse error response
	 */
	private async parseErrorResponse(response: Response): Promise<ApiErrorResponse> {
		try {
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				return await response.json();
			}
		} catch {
			// Ignore parsing errors
		}

		return {
			message: `HTTP error! status: ${response.status}`,
			statusCode: response.status,
		};
	}

	/**
	 * Get error type from status code
	 */
	private getErrorType(status: number): ApiErrorType {
		if (status >= 400 && status < 500) {
			return ApiErrorType.CLIENT;
		}
		if (status >= 500) {
			return ApiErrorType.SERVER;
		}
		return ApiErrorType.UNKNOWN;
	}

	/**
	 * Handle and transform errors
	 */
	private handleError(error: unknown, url: string): ApiError {
		// Already an ApiError, re-throw
		if (error instanceof ApiError) {
			return error;
		}

		// AbortError (timeout)
		if (error instanceof Error && error.name === "AbortError") {
			return new ApiError(
				`Request timeout: ${url}`,
				ApiErrorType.TIMEOUT,
				0,
				"TIMEOUT",
				undefined,
				error
			);
		}

		// Network errors
		if (error instanceof TypeError && error.message.includes("fetch")) {
			return new ApiError(
				`Network error: ${error.message}`,
				ApiErrorType.NETWORK,
				0,
				"NETWORK_ERROR",
				undefined,
				error
			);
		}

		// Unknown errors
		return new ApiError(
			error instanceof Error ? error.message : "Unknown error occurred",
			ApiErrorType.UNKNOWN,
			0,
			"UNKNOWN_ERROR",
			undefined,
			error instanceof Error ? error : new Error(String(error))
		);
	}
}

// ============================================================================
// Default Instance Factory
// ============================================================================

/**
 * Create a default API client instance
 *
 * Usage:
 * ```ts
 * const api = createApiClient({
 *   baseURL: process.env.NEXT_PUBLIC_API_URL!,
 * });
 * ```
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
	return new ApiClient(config);
}

/**
 * Default API client instance
 * Configure this with your API settings
 *
 * Usage:
 * ```ts
 * import { apiClient } from '@/lib/api/api-client';
 * const data = await apiClient.get<User>('/users/1');
 * ```
 */
export const apiClient = (() => {
	// Lazy import to avoid circular dependencies
	// env.ts validates variables at module load
	let baseURL: string;
	try {
		// Import env at module level to ensure validation happens
		// Using dynamic import would require async, so we use a try-catch
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { env } = require("../env");
		baseURL = env.NEXT_PUBLIC_API_URL;
	} catch {
		// Fallback if env validation fails (shouldn't happen in normal operation)
		baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
	}

	return createApiClient({
		baseURL,
		// Add your auth token getter here
		// getAuthToken: () => localStorage.getItem('token'),
	});
})();

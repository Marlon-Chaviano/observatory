/**
 * Logout Service
 *
 * Handles user logout and session termination.
 * Sends authenticated requests with cookies to invalidate the session.
 */

import { apiClient, ApiError, ApiErrorType } from "@/lib/api/api-client";

/**
 * Logout response from the server
 * The backend invalidates the current session and removes the auth cookie.
 */
export interface LogoutResponse {
	/**
	 * Success message from the server
	 */
	message?: string;
	/**
	 * Whether logout was successful
	 */
	success?: boolean;
}

/**
 * Logout the currently authenticated user
 *
 * This function sends a logout request to the backend's logout endpoint.
 * The backend invalidates the current session and responds with a Delete-Cookie
 * header to remove the HTTP-only authentication cookie from the browser.
 *
 * After successful logout, all subsequent requests will not be authenticated
 * since the cookie will be removed.
 *
 * @returns Promise resolving to the logout response
 * @throws ApiError if the user is not authenticated or server error occurs
 *
 * @example
 * ```ts
 * try {
 *   const result = await logout();
 *   console.log(result.message); // "Successfully logged out"
 *   // User is now logged out, redirected to login page
 *   window.location.href = '/login';
 * } catch (error) {
 *   if (error instanceof ApiError && error.status === 401) {
 *     console.error('User is not authenticated');
 *   }
 * }
 * ```
 */
export async function logout(): Promise<LogoutResponse> {
	try {
		const response = await apiClient.post<LogoutResponse>(
			"/auth/logout/",
			{},
			{
				// ✅ ENVIAR cookies en logout (usuario está autenticado)
				// Por defecto credentials: 'include', pero se especifica por claridad
				credentials: "include",
			}
		);

		return response;
	} catch (error) {
		// Re-throw ApiError as-is for proper error handling
		if (error instanceof ApiError) {
			throw error;
		}

		// Wrap other errors as ApiError
		throw new ApiError(
			error instanceof Error ? error.message : "Logout failed",
			"UNKNOWN" as ApiErrorType
		);
	}
}

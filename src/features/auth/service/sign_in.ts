/**
 * Sign In Service
 *
 * Handles user authentication and login flow.
 * Sends credentials without cookies since the user hasn't authenticated yet.
 */

import { User } from "@/features/users/types";
import { apiClient, ApiError, ApiErrorType } from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/constants";

/**
 * Login request payload
 */
export interface SignInPayload {
	/**
	 * Email address of the user
	 * Must exist in the database
	 */
	email: string;
	/**
	 * User password
	 */
	password: string;
	/**
	 * User role for the login
	 */
	role: string;
}

/**
 * Login response from the server
 * After successful login, the backend sets an HTTP-only cookie
 */

export interface SignInResponse {
	data: User;
	success: boolean;
}

/**
 * Sign in (login) a user
 *
 * This function sends the user credentials to the backend's login endpoint.
 * The backend validates the credentials and responds with an HTTP-only cookie
 * containing the authentication token if successful.
 *
 * Subsequent requests will automatically include this cookie via `credentials: 'include'`.
 *
 * @param payload - Object containing email and password
 * @returns Promise resolving to the login response with user data
 * @throws ApiError if credentials are invalid or server error occurs
 *
 * @example
 * ```ts
 * try {
 *   const user = await signIn({ email: 'usuario@example.com', password: 'MiContraseña123!' });
 *   console.log('Logged in as:', user.username);
 *   // Cookie is now set, subsequent requests are authenticated
 * } catch (error) {
 *   if (error instanceof ApiError && error.status === 401) {
 *     console.error('Invalid credentials');
 *   }
 * }
 * ```
 */
export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
	try {
		// const { role, ...credentials } = payload;
		const response = await apiClient.post<SignInResponse>(API_ENDPOINTS.AUTH.LOGIN, payload, {
			// ❌ NO enviar cookies en login (usuario aún no autenticado)
			credentials: "omit",
		});

		return response;
	} catch (error) {
		// Re-throw ApiError as-is for proper error handling
		if (error instanceof ApiError) {
			throw error;
		}

		// Wrap other errors as ApiError
		throw new ApiError(
			error instanceof Error ? error.message : "Sign in failed",
			ApiErrorType.UNKNOWN
		);
	}
}

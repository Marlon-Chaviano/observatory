/**
 * Sign Up Service
 *
 * Handles user registration and account creation.
 * Sends credentials without cookies since the user hasn't authenticated yet.
 */

import { User } from "@/features/users";
import { apiClient, ApiError, ApiErrorType } from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/constants";

/**
 * Sign up request payload
 */
export interface SignUpPayload {
	/**
	 * Email address for account recovery and notifications
	 * Must be unique in the system
	 */
	email: string;
	/**
	 * Desired username for the new account
	 * Must be unique in the system
	 */
	username: string;
	/**
	 * Password for authentication
	 * Should meet security requirements (min length, complexity, etc.)
	 */
	password: string;
	/**
	 * User role for the new account
	 */
	role: string;
}

/**
 * Sign up response from the server
 * After successful registration, the user can log in with their credentials.
 */
export interface SignUpResponse {
	data: User;
	success: boolean;
}

/**
 * Sign up (register) a new user
 *
 * This function sends the registration data to the backend's signup endpoint.
 * The backend creates a new user account if the provided data is valid.
 *
 * After successful registration, the user will need to log in separately
 * using the signIn function to authenticate and receive the auth cookie.
 *
 * @param payload - Object containing email, username, and password
 * @returns Promise resolving to the registration response with user data
 * @throws ApiError if validation fails, username/email already exists, or server error occurs
 *
 * @example
 * ```ts
 * try {
 *   const newUser = await signUp({
 *     email: 'usuario@example.com',
 *     username: 'mi_usuario',
 *     password: 'MiContraseña123!'
 *   });
 *
 *   console.log('Account created for:', newUser.username);
 *
 *   // Now the user needs to log in
 *   const authenticated = await signIn({
 *     username: newUser.username,
 *     password: 'MiContraseña123!'
 *   });
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     if (error.response?.errors?.username) {
 *       console.error('Username already taken');
 *     }
 *     if (error.response?.errors?.email) {
 *       console.error('Email already registered');
 *     }
 *   }
 * }
 * ```
 */
export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
	try {
		// const { role, ...userData } = payload;
		const response = await apiClient.post<SignUpResponse>(API_ENDPOINTS.AUTH.REGISTER, payload, {
			// ❌ NO enviar cookies en registro (usuario aún no autenticado)
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
			error instanceof Error ? error.message : "Sign up failed",
			ApiErrorType.UNKNOWN
		);
	}
}

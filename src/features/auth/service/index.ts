/**
 * Authentication Services
 *
 * Centralized services for all authentication operations:
 * - User login (signIn)
 * - User registration (signUp)
 * - User logout (logout)
 *
 * All services use the AppClient with proper credential handling:
 * - signIn & signUp: credentials: 'omit' (no pre-existing auth)
 * - logout: credentials: 'include' (authenticated user)
 *
 * Usage:
 * ```ts
 * import { signIn, signUp, logout } from '@/features/auth/service';
 *
 * // Register new user
 * const newUser = await signUp({...userData});
 *
 * // Login
 * const user = await signIn({ username, password });
 *
 * // Logout
 * await logout();
 * ```
 */

export { logout, type LogoutResponse } from "./logout";
export { signIn, type SignInPayload, type SignInResponse } from "./sign_in";
export { signUp, type SignUpPayload, type SignUpResponse } from "./sign_up";

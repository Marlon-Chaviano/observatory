/**
 * User Validation Schemas
 *
 * Zod schemas for validating user-related data.
 * Used for form validation, API request validation, and type safety.
 */

import { z } from "zod";

import { UserRole, UserStatus } from "./types";

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation rules:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Schema for User ID
 */
export const userIdSchema = z.string().uuid("Invalid user ID format");

/**
 * Schema for User Role
 */
export const userRoleSchema = z.enum([UserRole.ADMIN, UserRole.USER, UserRole.MODERATOR] as const, {
	message: "Invalid user role",
});

/**
 * Schema for User Status
 */
export const userStatusSchema = z.enum(
	[UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.SUSPENDED, UserStatus.PENDING] as const,
	{
		message: "Invalid user status",
	}
);

/**
 * Schema for email validation
 */
export const emailSchema = z
	.string()
	.min(1, "Email is required")
	.email("Invalid email format")
	.regex(emailRegex, "Invalid email format")
	.toLowerCase()
	.trim();

/**
 * Schema for password validation
 */
export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(
		passwordRegex,
		"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
	);

/**
 * Schema for user name
 */
export const userNameSchema = z
	.string()
	.min(2, "Name must be at least 2 characters")
	.max(100, "Name must be less than 100 characters")
	.trim();

/**
 * Schema for creating a new user
 */
export const createUserSchema = z
	.object({
		email: emailSchema,
		name: userNameSchema,
		password: passwordSchema,
		role: userRoleSchema.optional().default(UserRole.USER),
	})
	.strict();

/**
 * Schema for updating a user
 */
export const updateUserSchema = z
	.object({
		email: emailSchema.optional(),
		name: userNameSchema.optional(),
		role: userRoleSchema.optional(),
		status: userStatusSchema.optional(),
		avatar: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
	})
	.strict()
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided",
	});

/**
 * Schema for updating user password
 */
export const updateUserPasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: passwordSchema,
	})
	.strict()
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: "New password must be different from current password",
		path: ["newPassword"],
	});

/**
 * Schema for user filters
 */
export const userFiltersSchema = z
	.object({
		search: z.string().min(1).optional(),
		role: userRoleSchema.optional(),
		status: userStatusSchema.optional(),
		sortBy: z.enum(["name", "email", "createdAt"]).optional(),
		sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
	})
	.strict();

/**
 * Type inference from schemas
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserPasswordInput = z.infer<typeof updateUserPasswordSchema>;
export type UserFiltersInput = z.infer<typeof userFiltersSchema>;

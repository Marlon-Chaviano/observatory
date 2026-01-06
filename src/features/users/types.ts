/**
 * User Types
 *
 * All types related to users feature.
 */

/**
 * User entity
 */
export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	status: UserStatus;
	avatar?: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * User role enumeration
 */
export enum UserRole {
	ADMIN = "admin",
	USER = "user",
	MODERATOR = "moderator",
}

/**
 * User status enumeration
 */
export enum UserStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	SUSPENDED = "suspended",
	PENDING = "pending",
}

/**
 * User filters for listing
 */
export interface UserFilters {
	search?: string;
	role?: UserRole;
	status?: UserStatus;
	sortBy?: "name" | "email" | "createdAt";
	sortOrder?: "asc" | "desc";
}

/**
 * DTO for creating a new user
 */
export interface CreateUserDto {
	email: string;
	name: string;
	password: string;
	role?: UserRole;
}

/**
 * DTO for updating a user
 */
export interface UpdateUserDto {
	email?: string;
	name?: string;
	role?: UserRole;
	status?: UserStatus;
	avatar?: string;
}

/**
 * DTO for updating user password
 */
export interface UpdateUserPasswordDto {
	currentPassword: string;
	newPassword: string;
}

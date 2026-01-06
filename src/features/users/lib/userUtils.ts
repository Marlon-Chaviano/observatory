/**
 * User Utilities
 *
 * Utility functions for user-related operations.
 */

import { User, UserFilters, UserRole, UserStatus } from "../types";

/**
 * Apply filters to a list of users
 */
export function applyUserFilters(users: User[], filters: UserFilters): User[] {
	let filtered = [...users];

	// Search filter
	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		filtered = filtered.filter(
			(user) =>
				user.name.toLowerCase().includes(searchLower) ||
				user.email.toLowerCase().includes(searchLower)
		);
	}

	// Role filter
	if (filters.role) {
		filtered = filtered.filter((user) => user.role === filters.role);
	}

	// Status filter
	if (filters.status) {
		filtered = filtered.filter((user) => user.status === filters.status);
	}

	return filtered;
}

/**
 * Sort users by a given field
 */
export function sortUsers(
	users: User[],
	sortBy: UserFilters["sortBy"],
	sortOrder: "asc" | "desc" = "asc"
): User[] {
	if (!sortBy) return users;

	const sorted = [...users].sort((a, b) => {
		let aValue: string | Date;
		let bValue: string | Date;

		switch (sortBy) {
			case "name":
				aValue = a.name.toLowerCase();
				bValue = b.name.toLowerCase();
				break;
			case "email":
				aValue = a.email.toLowerCase();
				bValue = b.email.toLowerCase();
				break;
			case "createdAt":
				aValue = a.createdAt;
				bValue = b.createdAt;
				break;
			default:
				return 0;
		}

		if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
		if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	return sorted;
}

/**
 * Get user role display name
 */
export function getUserRoleDisplayName(role: UserRole): string {
	const roleNames: Record<UserRole, string> = {
		[UserRole.ADMIN]: "Administrator",
		[UserRole.USER]: "User",
		[UserRole.MODERATOR]: "Moderator",
	};
	return roleNames[role] || role;
}

/**
 * Get user status display name
 */
export function getUserStatusDisplayName(status: UserStatus): string {
	const statusNames: Record<UserStatus, string> = {
		[UserStatus.ACTIVE]: "Active",
		[UserStatus.INACTIVE]: "Inactive",
		[UserStatus.SUSPENDED]: "Suspended",
		[UserStatus.PENDING]: "Pending",
	};
	return statusNames[status] || status;
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: User, role: UserRole): boolean {
	return user.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(user: User, roles: UserRole[]): boolean {
	return roles.includes(user.role);
}

/**
 * Check if user is active
 */
export function isUserActive(user: User): boolean {
	return user.status === UserStatus.ACTIVE;
}

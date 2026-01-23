/**
 * User Service
 *
 * Data layer for user operations.
 * Handles all API communication and data transformation.
 */

import { apiClient, ApiError } from "@/lib/api/api-client";

import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto, User, UserFilters } from "../types";

/**
 * API User format (as received from the API)
 */
interface ApiUser {
	id: string;
	email: string;
	name: string;
	role: string;
	status: string;
	avatar?: string;
	created_at: string;
	updated_at: string;
}

/**
 * Transform user data from API format to application format
 */
function transformUserFromAPI(data: ApiUser): User {
	return {
		id: data.id,
		email: data.email,
		name: data.name,
		role: data.role as User["role"],
		status: data.status as User["status"],
		avatar: data.avatar,
		createdAt: new Date(data.created_at),
		updatedAt: new Date(data.updated_at),
	};
}

/**
 * User Service
 *
 * Handles all user-related API operations.
 */
export const userService = {
	/**
	 * Get all users with optional filters
	 */
	async getUsers(filters?: UserFilters): Promise<User[]> {
		try {
			const isServer = typeof window === "undefined";
			// Transform UserFilters to API params (convert enums to strings)
			const params: Record<string, string | number | boolean | null | undefined> | undefined =
				filters
					? {
							...(filters.search && { search: filters.search }),
							...(filters.role && { role: filters.role }),
							...(filters.status && { status: filters.status }),
							...(filters.sortBy && { sortBy: filters.sortBy }),
							...(filters.sortOrder && { sortOrder: filters.sortOrder }),
						}
					: undefined;
			const data = await apiClient.get<ApiUser[]>("/users", {
				params,
				...(isServer && {
					next: {
						tags: ["users"],
						revalidate: 3600, // Cache for 1 hour
					},
				}),
			});

			return data.map(transformUserFromAPI);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error fetching users:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},

	/**
	 * Get a single user by ID
	 */
	async getUserById(id: string): Promise<User> {
		try {
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<ApiUser>(`/users/${id}`, {
				...(isServer && {
					next: {
						tags: ["users", `user-${id}`],
						revalidate: 3600,
					},
				}),
			});

			return transformUserFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 404) {
					throw new Error("User not found");
				}
				throw new Error(`Failed to fetch user: ${error.message}`);
			}
			throw error;
		}
	},

	/**
	 * Create a new user
	 */
	async createUser(dto: CreateUserDto): Promise<User> {
		try {
			const data = await apiClient.post<ApiUser>("/users", dto);
			return transformUserFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error creating user:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},

	/**
	 * Update an existing user
	 */
	async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
		try {
			const data = await apiClient.patch<ApiUser>(`/users/${id}`, dto);
			return transformUserFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error updating user:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},

	/**
	 * Update user password
	 */
	async updateUserPassword(id: string, dto: UpdateUserPasswordDto): Promise<void> {
		try {
			await apiClient.patch(`/users/${id}/password`, dto);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error updating user password:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},

	/**
	 * Delete a user
	 */
	async deleteUser(id: string): Promise<void> {
		try {
			await apiClient.delete(`/users/${id}`);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error deleting user:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},
};

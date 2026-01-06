/**
 * useUsers Hook
 *
 * Application layer hook for managing users.
 * Combines data fetching with business logic.
 */

"use client";

import { useMemo } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userService } from "../lib/userService";
import { applyUserFilters, sortUsers } from "../lib/userUtils";
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto, UserFilters } from "../types";

/**
 * Hook for fetching and filtering users
 */
export function useUsers(filters?: UserFilters) {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["users", filters],
		queryFn: () => userService.getUsers(),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	// Apply business logic (filtering, sorting)
	const processedUsers = useMemo(() => {
		if (!data) return [];

		let users = data;

		// Apply filters
		if (filters) {
			users = applyUserFilters(users, filters);
		}

		// Apply sorting
		if (filters?.sortBy) {
			users = sortUsers(users, filters.sortBy, filters.sortOrder);
		}

		return users;
	}, [data, filters]);

	return {
		users: processedUsers,
		isLoading,
		error,
		refetch,
	};
}

/**
 * Hook for fetching a single user
 */
export function useUser(id: string) {
	return useQuery({
		queryKey: ["user", id],
		queryFn: () => userService.getUserById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

/**
 * Hook for creating a user
 */
export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateUserDto) => userService.createUser(dto),
		onSuccess: () => {
			// Invalidate users list
			void queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}

/**
 * Hook for updating a user
 */
export function useUpdateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDto }) =>
			userService.updateUser(id, dto),
		onSuccess: (_, variables) => {
			// Invalidate both list and specific user
			void queryClient.invalidateQueries({ queryKey: ["users"] });
			void queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
		},
	});
}

/**
 * Hook for updating user password
 */
export function useUpdateUserPassword() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: UpdateUserPasswordDto }) =>
			userService.updateUserPassword(id, dto),
		onSuccess: (_, variables) => {
			// Invalidate user data
			void queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
		},
	});
}

/**
 * Hook for deleting a user
 */
export function useDeleteUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => userService.deleteUser(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}

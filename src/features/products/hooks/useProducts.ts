/**
 * useProducts Hook
 *
 * Application layer hook for managing products.
 * Combines data fetching with business logic.
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../lib/productService";
import { applyProductFilters, sortProducts } from "../lib/productUtils";
import { ProductFilters, CreateProductDto } from "../types";
import { useMemo } from "react";

/**
 * Hook for fetching and filtering products
 */
export function useProducts(filters?: ProductFilters) {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["products", filters],
		queryFn: () => productService.getProducts(),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	// Apply business logic (filtering, sorting)
	const processedProducts = useMemo(() => {
		if (!data) return [];

		let products = data;

		// Apply filters
		if (filters) {
			products = applyProductFilters(products, filters);
		}

		// Apply sorting
		if (filters?.sortBy) {
			products = sortProducts(products, filters.sortBy);
		}

		return products;
	}, [data, filters]);

	return {
		products: processedProducts,
		isLoading,
		error,
		refetch,
	};
}

/**
 * Hook for fetching a single product
 */
export function useProduct(id: string) {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => productService.getProductById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

/**
 * Hook for creating a product
 */
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateProductDto) => productService.createProduct(dto),
		onSuccess: () => {
			// Invalidate products list
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

/**
 * Hook for updating a product
 */
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateProductDto> }) =>
			productService.updateProduct(id, dto),
		onSuccess: (_, variables) => {
			// Invalidate both list and specific product
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
		},
	});
}

/**
 * Hook for deleting a product
 */
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => productService.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

/**
 * Product Service - Example Usage
 *
 * This file demonstrates how to use the centralized API client
 * in a service layer. This is an example implementation.
 */

import { Product, ProductFilters, CreateProductDto } from "../types";
import { apiClient, ApiError } from "@/lib/api/api-client";

/**
 * Transform product data from API format to application format
 */
function transformProductFromAPI(data: {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	rating: number;
	stock: number;
	created_at: string;
	updated_at: string;
}): Product {
	return {
		id: data.id,
		name: data.name,
		description: data.description,
		price: data.price,
		image: data.image,
		category: data.category,
		rating: data.rating,
		stock: data.stock,
		createdAt: new Date(data.created_at),
		updatedAt: new Date(data.updated_at),
	};
}

/**
 * Product Service
 *
 * Example service using the centralized API client.
 * This demonstrates:
 * - Typed requests with generics
 * - Error handling with typed errors
 * - Server Component compatibility (with Next.js caching)
 * - Client Component compatibility
 * - Query parameters
 * - Request configuration
 */
export const productService = {
	/**
	 * Fetch all products with optional filters
	 *
	 * Example usage:
	 * ```ts
	 * // In Server Component
	 * const products = await productService.getProducts({ category: 'electronics' });
	 *
	 * // In Client Component (with React Query)
	 * const { data } = useQuery({
	 *   queryKey: ['products', filters],
	 *   queryFn: () => productService.getProducts(filters),
	 * });
	 * ```
	 */
	async getProducts(filters?: ProductFilters): Promise<Product[]> {
		try {
			// Build query parameters
			const params: Record<string, string | number> = {};
			if (filters?.category) params.category = filters.category;
			if (filters?.minPrice !== undefined) params.minPrice = filters.minPrice;
			if (filters?.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
			if (filters?.search) params.search = filters.search;

			// Make request with typed response
			// For Server Components, we can use Next.js caching
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<Product[]>("/products", {
				params,
				// Next.js caching options (only works in Server Components)
				...(isServer && {
					next: {
						tags: ["products"],
						revalidate: 3600, // Cache for 1 hour
					},
				}),
			});

			// Transform API response to application format
			return data.map(transformProductFromAPI);
		} catch (error) {
			// Handle typed errors
			if (error instanceof ApiError) {
				// Log error with context
				console.error("Error fetching products:", {
					type: error.type,
					status: error.status,
					message: error.message,
					code: error.code,
				});

				// Re-throw with more context if needed
				if (error.isClientError()) {
					throw new Error(`Failed to fetch products: ${error.message}`);
				}
				if (error.isServerError()) {
					throw new Error("Server error while fetching products. Please try again later.");
				}
				if (error.isNetworkError()) {
					throw new Error("Network error. Please check your connection.");
				}
			}

			// Re-throw unknown errors
			throw error;
		}
	},

	/**
	 * Fetch a single product by ID
	 *
	 * Example usage:
	 * ```ts
	 * const product = await productService.getProductById('123');
	 * ```
	 */
	async getProductById(id: string): Promise<Product> {
		try {
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<Product>(`/products/${id}`, {
				...(isServer && {
					next: {
						tags: ["products", `product-${id}`],
						revalidate: 3600,
					},
				}),
			});

			return transformProductFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 404) {
					throw new Error("Product not found");
				}
				throw new Error(`Failed to fetch product: ${error.message}`);
			}
			throw error;
		}
	},

	/**
	 * Create a new product
	 *
	 * Example usage:
	 * ```ts
	 * const newProduct = await productService.createProduct({
	 *   name: 'New Product',
	 *   price: 99.99,
	 *   // ... other fields
	 * });
	 * ```
	 */
	async createProduct(dto: CreateProductDto): Promise<Product> {
		try {
			const data = await apiClient.post<Product>("/products", dto, {
				// Auth token will be automatically included if configured
				includeAuth: true,
			});

			return transformProductFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.isClientError()) {
					// Handle validation errors
					if (error.response?.errors) {
						const validationErrors = Object.entries(error.response.errors)
							.map(([field, messages]) => `${field}: ${messages.join(", ")}`)
							.join("\n");
						throw new Error(`Validation failed: ${validationErrors}`);
					}
				}
				throw new Error(`Failed to create product: ${error.message}`);
			}
			throw error;
		}
	},

	/**
	 * Update an existing product
	 *
	 * Example usage:
	 * ```ts
	 * const updated = await productService.updateProduct('123', {
	 *   price: 89.99,
	 * });
	 * ```
	 */
	async updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product> {
		try {
			const data = await apiClient.patch<Product>(`/products/${id}`, dto, {
				includeAuth: true,
			});

			return transformProductFromAPI(data);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 404) {
					throw new Error("Product not found");
				}
				throw new Error(`Failed to update product: ${error.message}`);
			}
			throw error;
		}
	},

	/**
	 * Delete a product
	 *
	 * Example usage:
	 * ```ts
	 * await productService.deleteProduct('123');
	 * ```
	 */
	async deleteProduct(id: string): Promise<void> {
		try {
			await apiClient.delete(`/products/${id}`, {
				includeAuth: true,
			});
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 404) {
					throw new Error("Product not found");
				}
				throw new Error(`Failed to delete product: ${error.message}`);
			}
			throw error;
		}
	},
};

/**
 * Example: Using with React Query
 *
 * ```ts
 * 'use client';
 *
 * import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 * import { productService } from '@/features/products/lib/productService';
 *
 * // Query
 * function useProducts(filters?: ProductFilters) {
 *   return useQuery({
 *     queryKey: ['products', filters],
 *     queryFn: () => productService.getProducts(filters),
 *   });
 * }
 *
 * // Mutation
 * function useCreateProduct() {
 *   const queryClient = useQueryClient();
 *
 *   return useMutation({
 *     mutationFn: productService.createProduct,
 *     onSuccess: () => {
 *       queryClient.invalidateQueries({ queryKey: ['products'] });
 *     },
 *   });
 * }
 * ```
 */

/**
 * Example: Using in Server Component
 *
 * ```ts
 * // app/products/page.tsx
 * import { productService } from '@/features/products/lib/productService';
 *
 * export default async function ProductsPage() {
 *   // This will use Next.js caching automatically
 *   const products = await productService.getProducts();
 *
 *   return (
 *     <div>
 *       {products.map(product => (
 *         <ProductCard key={product.id} product={product} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Example: Custom API client instance with auth
 *
 * ```ts
 * import { createApiClient } from '@/lib/api/api-client';
 *
 * // Create client with auth token from localStorage
 * const authenticatedClient = createApiClient({
 *   baseURL: process.env.NEXT_PUBLIC_API_URL!,
 *   getAuthToken: () => {
 *     // In Client Component
 *     if (typeof window !== 'undefined') {
 *       return localStorage.getItem('authToken');
 *     }
 *     // In Server Component (from cookies, etc.)
 *     return null;
 *   },
 * });
 *
 * // Use the custom client
 * const user = await authenticatedClient.get<User>('/users/me');
 * ```
 */

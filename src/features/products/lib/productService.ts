/**
 * Product Service
 *
 * Data layer for product operations.
 * Handles all API communication and data transformation.
 */

import { Product, ProductFilters, CreateProductDto } from "../types";
import { apiClient, ApiError } from "@/lib/api/api-client";

// API_BASE_URL is now configured in the centralized API client

/**
 * API Product format (as received from the API)
 */
interface ApiProduct {
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
}

/**
 * Transform product data from API format to application format
 */
function transformProductFromAPI(data: ApiProduct): Product {
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
 * Handles all product-related API operations.
 * This is the data layer - no business logic here.
 */
export const productService = {
	/**
	 * Fetch all products with optional filters
	 */
	async getProducts(filters?: ProductFilters): Promise<Product[]> {
		try {
			// Build query parameters
			const params: Record<string, string | number> = {};
			if (filters?.category) params.category = filters.category;
			if (filters?.minPrice !== undefined) params.minPrice = filters.minPrice;
			if (filters?.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
			if (filters?.search) params.search = filters.search;

			// Use centralized API client (works in both Server and Client Components)
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<ApiProduct[]>("/products", {
				params,
				// Next.js caching options (only works in Server Components)
				...(isServer && {
					next: {
						tags: ["products"],
						revalidate: 3600, // Cache for 1 hour
					},
				}),
			});

			return data.map(transformProductFromAPI);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error fetching products:", {
					type: error.type,
					status: error.status,
					message: error.message,
				});
			}
			throw error;
		}
	},

	/**
	 * Fetch a single product by ID
	 */
	async getProductById(id: string): Promise<Product> {
		try {
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<ApiProduct>(`/products/${id}`, {
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
	 */
	async createProduct(dto: CreateProductDto): Promise<Product> {
		try {
			const data = await apiClient.post<ApiProduct>("/products", dto);
			return transformProductFromAPI(data);
		} catch (error) {
			console.error("Error creating product:", error);
			throw error;
		}
	},

	/**
	 * Update an existing product
	 */
	async updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product> {
		try {
			const data = await apiClient.patch<ApiProduct>(`/products/${id}`, dto);
			return transformProductFromAPI(data);
		} catch (error) {
			console.error("Error updating product:", error);
			throw error;
		}
	},

	/**
	 * Delete a product
	 */
	async deleteProduct(id: string): Promise<void> {
		try {
			await apiClient.delete(`/products/${id}`);
		} catch (error) {
			console.error("Error deleting product:", error);
			throw error;
		}
	},
};

/**
 * Product Feature Types
 *
 * Type definitions specific to the products feature.
 */

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	rating: number;
	stock: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductFilters {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	inStock?: boolean;
	sortBy?: "price" | "rating" | "name";
}

export interface CreateProductDto {
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	stock: number;
}

export interface ProductStats {
	total: number;
	averagePrice: number;
	averageRating: number;
	categories: string[];
}

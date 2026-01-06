/**
 * Product Utilities
 *
 * Business logic and utility functions for products.
 * This is the application layer - contains business rules.
 */

import { Product, ProductFilters } from "../types";

/**
 * Apply business rules for filtering products
 */
export function applyProductFilters(products: Product[], filters: ProductFilters): Product[] {
	let filtered = [...products];

	// Filter by category
	if (filters.category) {
		filtered = filtered.filter((p) => p.category === filters.category);
	}

	// Filter by price range
	if (filters.minPrice !== undefined) {
		filtered = filtered.filter((p) => p.price >= filters.minPrice!);
	}
	if (filters.maxPrice !== undefined) {
		filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
	}

	// Filter by search term
	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		filtered = filtered.filter(
			(p) =>
				p.name.toLowerCase().includes(searchLower) ||
				p.description.toLowerCase().includes(searchLower)
		);
	}

	// Filter by stock availability
	if (filters.inStock !== undefined) {
		filtered = filtered.filter((p) => (filters.inStock ? p.stock > 0 : p.stock === 0));
	}

	return filtered;
}

/**
 * Sort products by various criteria
 */
export function sortProducts(
	products: Product[],
	sortBy: "price" | "rating" | "name" = "name"
): Product[] {
	const sorted = [...products];

	switch (sortBy) {
		case "price":
			return sorted.sort((a, b) => a.price - b.price);
		case "rating":
			return sorted.sort((a, b) => b.rating - a.rating);
		case "name":
		default:
			return sorted.sort((a, b) => a.name.localeCompare(b.name));
	}
}

/**
 * Calculate discounted price
 */
export function calculateDiscountedPrice(price: number, discountPercent: number): number {
	return price * (1 - discountPercent / 100);
}

/**
 * Check if product is on sale (business rule)
 */
export function isProductOnSale(product: Product): boolean {
	// Business rule: Product is on sale if rating > 4.5 or stock < 10
	return product.rating > 4.5 || product.stock < 10;
}

/**
 * Get product categories from products list
 */
export function getCategories(products: Product[]): string[] {
	const categories = new Set(products.map((p) => p.category));
	return Array.from(categories).sort();
}

/**
 * Validate product data
 */
export function validateProduct(product: Partial<Product>): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	if (!product.name || product.name.trim().length === 0) {
		errors.push("Product name is required");
	}

	if (product.price !== undefined && product.price < 0) {
		errors.push("Product price must be positive");
	}

	if (product.stock !== undefined && product.stock < 0) {
		errors.push("Product stock cannot be negative");
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

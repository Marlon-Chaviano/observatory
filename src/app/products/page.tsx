/**
 * Products Page
 *
 * Example of a Server Component page using the feature-first architecture.
 *
 * This demonstrates:
 * - Server-side data fetching
 * - Composing feature components
 * - Separating Server and Client Components
 */

import { Suspense } from "react";
import { ProductList } from "@/features/products";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { productService } from "@/features/products/lib/productService";
import { getCategories } from "@/features/products/lib/productUtils";
import { ProductFilters as ProductFiltersType } from "@/features/products/types";

// Loading component for Suspense
function ProductsLoading() {
	return (
		<div className="container mx-auto space-y-6 p-6">
			<div className="h-8 w-64 animate-pulse rounded bg-muted" />
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
				))}
			</div>
		</div>
	);
}

// Server Component for fetching and displaying products
async function ProductsContent({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// Fetch products on the server
	const allProducts = await productService.getProducts();

	// Parse filters from URL search params
	const filters: ProductFiltersType = {
		category: typeof searchParams.category === "string" ? searchParams.category : undefined,
		search: typeof searchParams.search === "string" ? searchParams.search : undefined,
		minPrice: typeof searchParams.minPrice === "string" ? Number(searchParams.minPrice) : undefined,
		maxPrice: typeof searchParams.maxPrice === "string" ? Number(searchParams.maxPrice) : undefined,
		inStock: typeof searchParams.inStock === "string" ? searchParams.inStock === "true" : undefined,
		sortBy:
			typeof searchParams.sortBy === "string" &&
			["price", "rating", "name"].includes(searchParams.sortBy)
				? (searchParams.sortBy as "price" | "rating" | "name")
				: undefined,
	};

	// Get categories for filter dropdown
	const categories = getCategories(allProducts);

	return (
		<div className="container mx-auto space-y-6 p-6">
			<h1 className="text-4xl font-bold">Products</h1>

			<div className="grid gap-6 lg:grid-cols-4">
				{/* Client Component for filters - only the interactive part */}
				<div className="lg:col-span-1">
					<ProductFilters
						initialFilters={filters}
						onFiltersChange={(newFilters) => {
							// In a real app, this would update the URL and trigger a re-fetch
							// For now, this is just a placeholder
							console.log("Filters changed:", newFilters);
						}}
						categories={categories}
					/>
				</div>

				{/* Server Component for product list */}
				<div className="lg:col-span-3">
					<ProductList products={allProducts} />
				</div>
			</div>
		</div>
	);
}

// Main page component with Suspense boundary
export default function ProductsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	return (
		<Suspense fallback={<ProductsLoading />}>
			<ProductsContent searchParams={searchParams} />
		</Suspense>
	);
}

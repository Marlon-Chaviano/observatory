/**
 * ProductList Component
 *
 * Presentation layer component for displaying a list of products.
 * This is a Server Component - receives data as props.
 */

import { Product } from "../types";
import { ProductCard } from "./ProductCard";

export interface ProductListProps {
	products: Product[];
	onAddToCart?: (productId: string) => void;
}

/**
 * ProductList - Server Component
 *
 * Renders a grid of product cards.
 * Data is fetched in the parent Server Component and passed as props.
 */
export function ProductList({ products, onAddToCart }: ProductListProps) {
	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<p className="text-lg text-muted-foreground">No products found</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
			))}
		</div>
	);
}

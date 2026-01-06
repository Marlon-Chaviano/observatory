/**
 * ProductCard Component
 *
 * Presentation layer component for displaying a product.
 * This is a Server Component by default - no interactivity needed here.
 */

import { Product } from "../types";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { isProductOnSale } from "../lib/productUtils";

export interface ProductCardProps {
	product: Product;
	onAddToCart?: (productId: string) => void;
}

/**
 * ProductCard - Server Component
 *
 * Displays product information. If interactivity is needed,
 * wrap the interactive parts in a Client Component.
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
	const onSale = isProductOnSale(product);

	return (
		<Card variant="interactive" className="h-full">
			<CardHeader>
				<div className="relative">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={product.image}
						alt={product.name}
						className="h-48 w-full rounded-lg object-cover"
					/>
					{onSale && (
						<Badge variant="destructive" className="absolute right-2 top-2">
							Sale
						</Badge>
					)}
				</div>
				<CardTitle>{product.name}</CardTitle>
			</CardHeader>
			<CardBody>
				<p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
				<div className="mt-4 flex items-center justify-between">
					<span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
					<Badge variant={product.stock > 0 ? "success" : "destructive"}>
						{product.stock > 0 ? "In Stock" : "Out of Stock"}
					</Badge>
				</div>
				<div className="mt-2 flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Rating:</span>
					<Badge variant="secondary">{product.rating.toFixed(1)} ⭐</Badge>
				</div>
			</CardBody>
			{onAddToCart && (
				<CardFooter>
					<Button
						variant="default"
						size="md"
						fullWidth
						disabled={product.stock === 0}
						onClick={() => onAddToCart(product.id)}
					>
						Add to Cart
					</Button>
				</CardFooter>
			)}
		</Card>
	);
}

/**
 * ProductFilters Component
 *
 * Client Component for filtering products.
 * This needs 'use client' because it uses state and interactivity.
 */

"use client";

import { useState } from "react";
import { ProductFilters as ProductFiltersType } from "../types";
import { Button } from "@/components/primitives/Button";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/primitives/Card";

export interface ProductFiltersProps {
	initialFilters?: ProductFiltersType;
	onFiltersChange: (filters: ProductFiltersType) => void;
	categories?: string[];
}

/**
 * ProductFilters - Client Component
 *
 * Handles user interactions for filtering products.
 * The actual filtering logic is in the application layer (hooks).
 */
export function ProductFilters({
	initialFilters,
	onFiltersChange,
	categories = [],
}: ProductFiltersProps) {
	const [filters, setFilters] = useState<ProductFiltersType>(initialFilters || {});

	const handleFilterChange = (
		key: keyof ProductFiltersType,
		value: string | number | boolean | undefined
	) => {
		const newFilters = { ...filters, [key]: value };
		setFilters(newFilters);
		onFiltersChange(newFilters);
	};

	const handleReset = () => {
		const emptyFilters: ProductFiltersType = {};
		setFilters(emptyFilters);
		onFiltersChange(emptyFilters);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Filters</CardTitle>
			</CardHeader>
			<CardBody className="space-y-4">
				{/* Search */}
				<div>
					<label htmlFor="search" className="mb-2 block text-sm font-medium">
						Search
					</label>
					<input
						id="search"
						type="text"
						value={filters.search || ""}
						onChange={(e) => handleFilterChange("search", e.target.value)}
						placeholder="Search products..."
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					/>
				</div>

				{/* Category */}
				{categories.length > 0 && (
					<div>
						<label htmlFor="category" className="mb-2 block text-sm font-medium">
							Category
						</label>
						<select
							id="category"
							value={filters.category || ""}
							onChange={(e) => handleFilterChange("category", e.target.value || undefined)}
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						>
							<option value="">All Categories</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				)}

				{/* Price Range */}
				<div className="grid grid-cols-2 gap-2">
					<div>
						<label htmlFor="minPrice" className="mb-2 block text-sm font-medium">
							Min Price
						</label>
						<input
							id="minPrice"
							type="number"
							value={filters.minPrice || ""}
							onChange={(e) =>
								handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)
							}
							placeholder="0"
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						/>
					</div>
					<div>
						<label htmlFor="maxPrice" className="mb-2 block text-sm font-medium">
							Max Price
						</label>
						<input
							id="maxPrice"
							type="number"
							value={filters.maxPrice || ""}
							onChange={(e) =>
								handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)
							}
							placeholder="1000"
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						/>
					</div>
				</div>

				{/* In Stock */}
				<div>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={filters.inStock || false}
							onChange={(e) => handleFilterChange("inStock", e.target.checked ? true : undefined)}
							className="rounded border-input"
						/>
						<span className="text-sm">In Stock Only</span>
					</label>
				</div>

				{/* Sort */}
				<div>
					<label htmlFor="sortBy" className="mb-2 block text-sm font-medium">
						Sort By
					</label>
					<select
						id="sortBy"
						value={filters.sortBy || "name"}
						onChange={(e) =>
							handleFilterChange("sortBy", e.target.value as ProductFiltersType["sortBy"])
						}
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					>
						<option value="name">Name</option>
						<option value="price">Price</option>
						<option value="rating">Rating</option>
					</select>
				</div>

				{/* Reset Button */}
				<Button variant="outline" size="sm" fullWidth onClick={handleReset}>
					Reset Filters
				</Button>
			</CardBody>
		</Card>
	);
}

/**
 * Products Feature Barrel Export
 *
 * Central export point for the products feature.
 * This allows clean imports: import { ProductCard, useProducts } from '@/features/products'
 */

// Components
export { ProductCard, type ProductCardProps } from "./components/ProductCard";
export { ProductList, type ProductListProps } from "./components/ProductList";
export { ProductFilters, type ProductFiltersProps } from "./components/ProductFilters";

// Hooks
export {
	useProducts,
	useProduct,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
} from "./hooks/useProducts";

// Services
export { productService } from "./lib/productService";

// Utils
export * from "./lib/productUtils";

// Types
export type { Product, ProductFilters, CreateProductDto, ProductStats } from "./types";

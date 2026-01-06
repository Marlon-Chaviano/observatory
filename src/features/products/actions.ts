/**
 * Product Server Actions
 *
 * Server Actions for product mutations.
 * These run on the server and can be called from Client Components.
 */

"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { productService } from "./lib/productService";
import { validateProduct } from "./lib/productUtils";
import { CreateProductDto } from "./types";

/**
 * Create a new product (Server Action)
 */
export async function createProductAction(formData: FormData) {
	const product: CreateProductDto = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		price: Number(formData.get("price")),
		image: formData.get("image") as string,
		category: formData.get("category") as string,
		stock: Number(formData.get("stock")),
	};

	// Validate product
	const validation = validateProduct(product);
	if (!validation.valid) {
		return {
			success: false,
			error: validation.errors.join(", "),
		};
	}

	try {
		await productService.createProduct(product);

		// Revalidate products cache
		revalidateTag("products");

		// Redirect to products page
		redirect("/products");
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to create product",
		};
	}
}

/**
 * Update a product (Server Action)
 */
export async function updateProductAction(id: string, formData: FormData) {
	const updates: Partial<CreateProductDto> = {};

	const name = formData.get("name");
	if (name) updates.name = name as string;

	const description = formData.get("description");
	if (description) updates.description = description as string;

	const price = formData.get("price");
	if (price) updates.price = Number(price);

	const image = formData.get("image");
	if (image) updates.image = image as string;

	const category = formData.get("category");
	if (category) updates.category = category as string;

	const stock = formData.get("stock");
	if (stock) updates.stock = Number(stock);

	try {
		await productService.updateProduct(id, updates);

		// Revalidate both list and specific product
		revalidateTag("products");
		revalidateTag(`product-${id}`);

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to update product",
		};
	}
}

/**
 * Delete a product (Server Action)
 */
export async function deleteProductAction(id: string) {
	try {
		await productService.deleteProduct(id);

		// Revalidate products cache
		revalidateTag("products");

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to delete product",
		};
	}
}

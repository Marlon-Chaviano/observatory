/**
 * Global Validation Schemas
 *
 * Shared validation schemas using Zod.
 */

import { z } from "zod";

/**
 * Common validation schemas
 */

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid("Invalid UUID format");

/**
 * Email validation
 */
export const emailSchema = z.string().email("Invalid email format").toLowerCase().trim();

/**
 * URL validation
 */
export const urlSchema = z.string().url("Invalid URL format");

/**
 * Date string validation (ISO format)
 */
export const dateStringSchema = z.string().datetime("Invalid date format");

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(20),
});

/**
 * Sort order schema
 */
export const sortOrderSchema = z.enum(["asc", "desc"]).default("asc");

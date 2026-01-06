/**
 * UserForm Component
 *
 * Client Component for creating/editing users.
 * Requires interactivity (form state, validation).
 *
 * @example
 * ```tsx
 * <UserForm onSubmit={handleSubmit} initialData={user} />
 * ```
 */

"use client";

import { useState } from "react";

import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

import { createUserSchema, updateUserSchema } from "../schemas";
import { CreateUserDto, UpdateUserDto, User } from "../types";

interface UserFormProps {
	onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void>;
	initialData?: User;
	mode?: "create" | "edit";
}

export function UserForm({ onSubmit, initialData, mode = "create" }: UserFormProps) {
	const [formData, setFormData] = useState({
		email: initialData?.email || "",
		name: initialData?.name || "",
		password: "",
		role: initialData?.role || "user",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors({});

		try {
			// Validate with Zod schema
			const schema = mode === "create" ? createUserSchema : updateUserSchema;
			const validated = schema.parse(formData);

			await onSubmit(validated);
		} catch (error) {
			if (error instanceof Error) {
				// Handle Zod validation errors
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if ((error as any).name === "ZodError") {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const zodError = error as any;
					const fieldErrors: Record<string, string> = {};
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					zodError.errors?.forEach((err: any) => {
						if (err.path && Array.isArray(err.path) && err.path.length > 0) {
							fieldErrors[err.path[0] as string] = err.message as string;
						}
					});
					setErrors(fieldErrors);
				} else {
					setErrors({ submit: error.message });
				}
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Name */}
				<div>
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Name
					</label>
					<input
						id="name"
						type="text"
						value={formData.name}
						onChange={(e) => handleChange("name", e.target.value)}
						className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
						aria-invalid={errors.name ? "true" : "false"}
						aria-describedby={errors.name ? "name-error" : undefined}
					/>
					{errors.name && (
						<p id="name-error" className="text-destructive mt-1 text-sm" role="alert">
							{errors.name}
						</p>
					)}
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className="mb-2 block text-sm font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) => handleChange("email", e.target.value)}
						className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
						aria-invalid={errors.email ? "true" : "false"}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>
					{errors.email && (
						<p id="email-error" className="text-destructive mt-1 text-sm" role="alert">
							{errors.email}
						</p>
					)}
				</div>

				{/* Password (only for create mode) */}
				{mode === "create" && (
					<div>
						<label htmlFor="password" className="mb-2 block text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={formData.password}
							onChange={(e) => handleChange("password", e.target.value)}
							className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
							aria-invalid={errors.password ? "true" : "false"}
							aria-describedby={errors.password ? "password-error" : undefined}
						/>
						{errors.password && (
							<p id="password-error" className="text-destructive mt-1 text-sm" role="alert">
								{errors.password}
							</p>
						)}
					</div>
				)}

				{/* Role */}
				<div>
					<label htmlFor="role" className="mb-2 block text-sm font-medium">
						Role
					</label>
					<select
						id="role"
						value={formData.role}
						onChange={(e) => handleChange("role", e.target.value)}
						className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
					>
						<option value="user">User</option>
						<option value="moderator">Moderator</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				{/* Submit Error */}
				{errors.submit && (
					<p className="text-destructive text-sm" role="alert">
						{errors.submit}
					</p>
				)}

				{/* Submit Button */}
				<Button type="submit" disabled={isSubmitting} fullWidth>
					{isSubmitting ? "Submitting..." : mode === "create" ? "Create User" : "Update User"}
				</Button>
			</form>
		</Card>
	);
}

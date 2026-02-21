import { z } from "zod";

const registerRoleSchema = z.enum(["observer", "analyst", "admin"] as const, {
	message: "Rol inválido",
});

export const registerUserSchema = z
	.object({
		username: z
			.string()
			.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
			.max(50, "El nombre de usuario no puede exceder 50 caracteres")
			.trim(),
		email: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, "El correo es obligatorio")
			.email("Correo electrónico inválido"),
		password: z
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.max(128, "La contraseña no puede exceder 128 caracteres"),
		confirmPassword: z.string().min(1, "Debes confirmar la contraseña"),
		role: registerRoleSchema.default("observer"),
	})
	.superRefine((data, context) => {
		if (data.password !== data.confirmPassword) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Las contraseñas no coinciden",
				path: ["confirmPassword"],
			});
		}
	});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

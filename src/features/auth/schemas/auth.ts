import { z } from "zod";

// Esquema compartido de roles
const authRoleSchema = z.enum(["observer", "analyst", "admin"] as const, {
	message: "Rol inválido",
});

// Esquema base para campos comunes de autenticación
const baseAuthSchema = z.object({
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
	role: authRoleSchema,
});

// Esquema de registro de usuario
export const registerUserSchema = baseAuthSchema
	.extend({
		username: z
			.string()
			.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
			.max(50, "El nombre de usuario no puede exceder 50 caracteres")
			.trim(),
		confirmPassword: z.string().min(1, "Debes confirmar la contraseña"),
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

// Esquema de login mismos campos que el base auth
export const loginUserSchema = baseAuthSchema;

// Tipos inferidos desde los esquemas
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

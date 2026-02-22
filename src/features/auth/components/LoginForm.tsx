"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";
import { signIn } from "@/features/auht/service";
import { ApiError } from "@/lib/api/api-client";

// Configuración de roles
const ROLES = [
	{ id: "admin", label: "Administrador" },
	{ id: "analyst", label: "Analista" },
	{ id: "observer", label: "Observador" },
];

// Esquema de validación
const loginSchema = z.object({
	email: z.string().email("Correo no válido"),
	password: z.string().min(1, "La contraseña es obligatoria"),
	role: z.string().min(1, "Seleccione un rol"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			role: "observer", // Por defecto enviará "observer" a la API
		},
	});

	// eslint-disable-next-line react-hooks/incompatible-library
	const selectedRole = watch("role");

	const onSubmit = async (data: LoginFormValues) => {
		setServerError(null);
		try {
			// Al enviar 'data', el campo 'role' ya lleva el valor en inglés (admin, analyst u observer)
			await signIn(data);
			window.location.href = "/dashboard";
		} catch (error) {
			if (error instanceof ApiError) {
				setServerError(error.message || "Credenciales incorrectas o cuenta no aprobada");
			} else {
				setServerError("Error de conexión con el servidor");
			}
		}
	};

	return (
		<div className="w-full max-w-110">
			<div className="bg-card text-card-foreground border-border rounded-2xl border p-8 shadow-xl">
				{/* Header */}
				<div className="mb-8 flex flex-col items-center gap-6 text-center">
					<div className="text-primary mb-2 size-16">
						<svg fill="currentColor" viewBox="0 0 48 48">
							<path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
						</svg>
					</div>
					<h1 className="text-2xl font-bold tracking-tight">Iniciar Sesión</h1>
					<p className="text-muted-foreground text-sm">Acceda al portal del Observatorio Cubano</p>
				</div>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					{/* Usuario */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="email">Correo Electrónico</Label>
						<div className="relative">
							<User className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
							<Input
								{...register("email")}
								id="email"
								className={`bg-background border-input h-12 pl-11 ${errors.email ? "border-destructive" : ""}`}
								placeholder="nombre@ejemplo.com"
							/>
						</div>
						{errors.email && (
							<span className="text-destructive text-xs">{errors.email.message}</span>
						)}
					</div>

					{/* Contraseña */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="password">Contraseña</Label>
						<div className="relative">
							<Lock className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
							<Input
								{...register("password")}
								id="password"
								type={showPassword ? "text" : "password"}
								className={`bg-background border-input h-12 pr-11 pl-11 ${errors.password ? "border-destructive" : ""}`}
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 flex -translate-y-1/2 items-center transition-colors"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && (
							<span className="text-destructive text-xs">{errors.password.message}</span>
						)}
					</div>

					{/* Selección de Rol */}
					<div className="flex flex-col gap-2 text-left">
						<Label>Tipo de Cuenta</Label>
						<div className="bg-muted border-border flex gap-1 rounded-lg border p-1">
							{ROLES.map((role) => (
								<button
									key={role.id}
									type="button"
									onClick={() => setValue("role", role.id)}
									className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
										selectedRole === role.id
											? "bg-background text-primary shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{role.label}
								</button>
							))}
						</div>
					</div>

					{/* Recordarme */}
					<div className="mt-1 flex items-center justify-between">
						<label className="group flex cursor-pointer items-center gap-2 text-sm">
							<input
								type="checkbox"
								className="border-input text-primary focus:ring-primary bg-background rounded"
							/>
							<span className="text-muted-foreground group-hover:text-foreground transition-colors">
								Recordarme
							</span>
						</label>
						<Link href="/login" className="text-primary text-sm font-medium hover:underline">
							¿Olvidó su contraseña?
						</Link>
					</div>

					{serverError && (
						<div className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-2 text-center text-xs font-medium">
							{serverError}
						</div>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary text-primary-foreground shadow-primary/20 mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-50"
					>
						<span>{isSubmitting ? "Entrando..." : "Entrar"}</span>
						<LogIn size={20} />
					</Button>
				</form>

				<div className="border-border mt-8 border-t pt-6 text-center">
					<p className="text-muted-foreground text-sm">
						¿No tiene una cuenta?
						<Link href="/register" className="text-primary mt-1 block font-bold hover:underline">
							Solicite acceso aquí
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

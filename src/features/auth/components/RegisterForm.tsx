"use client";

import { FormEvent } from "react";
import Link from "next/link";

import { ArrowRight, ChevronDown, CircleAlert, Mail, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { Label } from "@/components/primitives/Label";
import { useRegitsterUser } from "@/features/auth/hooks/useRegitsterUser";

import { ROLES } from "../const/roles";
import { RegisterUserInput } from "../squemas/register-user";

import { InputField } from "./InputField";

export const RegisterForm = () => {
	const { formData, dispatch, onSubmit, status } = useRegitsterUser();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await onSubmit();
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	const handleChange = (name: keyof RegisterUserInput, value: string) => {
		dispatch({ type: "SET_FIELD", payload: { field: name, value } });
	};

	return (
		<div className="w-full max-w-125">
			<div className="bg-card text-card-foreground border-border rounded-2xl border p-8 shadow-xl">
				{/* Header */}
				<div className="mb-8 flex flex-col items-center gap-4 text-center">
					<h1 className="text-foreground text-2xl font-bold tracking-tight">Crear Cuenta</h1>
					<p className="text-muted-foreground text-sm">
						Únete al Observatorio Cubano de Energía y Minas
					</p>
				</div>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					{/* Usuario */}
					<InputField
						name="username"
						label="Nombre de Usuario"
						value={formData.username}
						onChange={handleChange}
						placeholder="juan_perez"
						required
						icon={<User size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
					/>

					{/* Email */}
					<InputField
						name="email"
						label="Correo Electrónico"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="usuario@dominio.cu"
						required
						icon={<Mail size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
					/>

					{/* Password Group */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<InputField
							name="password"
							label="Contraseña"
							type="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="••••••••"
							required
						/>
						<InputField
							name="confirmPassword"
							label="Confirmar"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="••••••••"
							required
						/>
					</div>

					{/* Rol */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="role" className="text-foreground flex items-center gap-2 font-semibold">
							<ShieldCheck size={18} strokeWidth={2.5} />
							Seleccionar Rol
						</Label>
						<div className="relative">
							<select
								id="role"
								name="role"
								value={formData.role}
								onChange={(e) => handleChange("role", e.target.value)}
								className="bg-background border-input focus:ring-primary flex h-12 w-full cursor-pointer appearance-none rounded-md border px-3 py-2 pr-10 text-sm focus:ring-2 focus:outline-none"
								required
							>
								{ROLES.map((role) => (
									<option key={role.value} value={role.value}>
										{role.label}
									</option>
								))}
							</select>
							<ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />
						</div>
					</div>

					{/* Cartel de Error */}
					{status.message && status.status === "error" && (
						<div className="border-destructive/30 bg-destructive/10 text-destructive animate-in fade-in flex items-center gap-2 rounded-lg border p-3 text-sm duration-300">
							<CircleAlert size={18} className="text-destructive" />
							<span className="font-medium">{status.message}</span>
						</div>
					)}

					<Button
						type="submit"
						disabled={status.status === "loading"}
						className="bg-primary text-primary-foreground mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90 active:scale-95"
					>
						<span>Registrarse</span>
						<ArrowRight size={20} />
					</Button>
				</form>

				<div className="border-border mt-8 border-t pt-6 text-center">
					<p className="text-muted-foreground text-sm">
						¿Ya tienes una cuenta?
						<Link
							href="/login"
							aria-disabled={status.status === "loading"}
							onClick={(e) => {
								if (status.status === "loading") {
									e.preventDefault();
								}
							}}
							className={status.status === "loading" ? "pointer-events-none opacity-50" : ""}
						>
							Inicia sesión aquí
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

import { ArrowRight, ChevronDown, CircleAlert, Mail, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";

const ROLES = [
	{ value: "observer", label: "Observador" },
	{ value: "analyst", label: "Analista de Datos" },
	{ value: "admin", label: "Administrador" },
];

export const RegisterForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "observer",
	});

	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Se limpia el error en cuanto el usuario vuelve a escribir
		if (error) setError(null);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		setError(null);
	};

	return (
		<div className="w-full max-w-125">
			<div className="bg-card text-card-foreground border-border rounded-2xl border p-8 shadow-xl">
				{/* Header */}
				<div className="mb-8 flex flex-col items-center gap-4 text-center">
					<h1 className="text-2xl font-bold tracking-tight text-[#181111]">Crear Cuenta</h1>
					<p className="text-muted-foreground text-sm">
						Únete al Observatorio Cubano de Energía y Minas
					</p>
				</div>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					{/* Usuario */}
					<div className="flex flex-col gap-2 text-left">
						<Label
							htmlFor="username"
							className="flex items-center gap-2 font-semibold text-[#181111]"
						>
							<User size={18} strokeWidth={2.5} />
							Nombre de Usuario
						</Label>
						<Input
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="bg-background border-input h-12"
							placeholder="juan_perez"
							required
						/>
					</div>

					{/* Email */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="email" className="flex items-center gap-2 font-semibold text-[#181111]">
							<Mail size={18} strokeWidth={2.5} />
							Correo Electrónico
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							className="bg-background border-input h-12"
							placeholder="usuario@dominio.cu"
							required
						/>
					</div>

					{/* Password Group */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-2 text-left">
							<Label htmlFor="password" className="text-[#181111]">
								Contraseña
							</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								className="bg-background border-input h-12"
								placeholder="••••••••"
								required
							/>
						</div>
						<div className="flex flex-col gap-2 text-left">
							<Label htmlFor="confirmPassword" className="text-[#181111]">
								Confirmar
							</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="bg-background border-input h-12"
								placeholder="••••••••"
								required
							/>
						</div>
					</div>

					{/* Rol */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="role" className="flex items-center gap-2 font-semibold text-[#181111]">
							<ShieldCheck size={18} strokeWidth={2.5} />
							Seleccionar Rol
						</Label>
						<div className="relative">
							<select
								id="role"
								name="role"
								value={formData.role}
								onChange={handleChange}
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
					{error && (
						<div className="animate-in fade-in flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 duration-300">
							<CircleAlert size={18} className="text-primary" />
							<span className="font-medium">{error}</span>
						</div>
					)}

					<Button
						type="submit"
						className="bg-primary text-primary-foreground mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90 active:scale-95"
					>
						<span>Registrarse</span>
						<ArrowRight size={20} />
					</Button>
				</form>

				<div className="border-border mt-8 border-t pt-6 text-center">
					<p className="text-muted-foreground text-sm">
						¿Ya tienes una cuenta?
						<Link href="/login" className="text-primary mt-1 block font-bold hover:underline">
							Inicia sesión aquí
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

"use client";

import Link from "next/link";

import { Lock, LogIn, User } from "lucide-react";

import { Button } from "@/components/primitives/Button";

import { ROLES } from "../const/roles";
import { useLoginUser, usePasswordToggle } from "../hooks";

import { InputField, RigthAddon, RoleSelector } from ".";

export const LoginForm = () => {
	const { register, handleSubmit, errors, isSubmitting, errorMessage } = useLoginUser();
	const { showPassword, togglePasswordVisibility, inputType } = usePasswordToggle();

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

				<form
					className="flex flex-col gap-5"
					onSubmit={handleSubmit}
					noValidate
					aria-label="Formulario de inicio de sesión"
				>
					{/* Email */}
					<InputField
						name="email"
						label="Correo Electrónico"
						type="email"
						field={register("email")}
						error={errors.email}
						placeholder="nombre@ejemplo.com"
						required
						icon={<User size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
					/>

					{/* Contraseña */}
					<InputField
						name="password"
						label="Contraseña"
						type={inputType}
						field={register("password")}
						error={errors.password}
						placeholder="••••••••"
						required
						icon={<Lock size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
						rightAddon={
							<RigthAddon
								showPassword={showPassword}
								togglePasswordVisibility={togglePasswordVisibility}
							/>
						}
					/>

					{/* Selección de Rol */}
					<RoleSelector
						name="role"
						label="Tipo de Cuenta"
						options={ROLES.map((role) => ({ id: role.value, label: role.label }))}
						field={register("role")}
						error={errors.role}
						required
						icon={<User size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold text-foreground"
					/>

					{/* Recordarme */}
					<div className="mt-1 flex items-center justify-between">
						<label className="group flex cursor-pointer items-center gap-2 text-sm">
							<input
								type="checkbox"
								className="border-input text-primary focus:ring-primary bg-background rounded"
								aria-label="Recordarme en este dispositivo"
							/>
							<span className="text-muted-foreground group-hover:text-foreground transition-colors">
								Recordarme
							</span>
						</label>
						<Link
							href="/reset-password"
							onClick={(e) => {
								if (isSubmitting) {
									e.preventDefault();
								}
							}}
							className="text-primary text-sm font-medium hover:underline"
						>
							¿Olvidó su contraseña?
						</Link>
					</div>

					{/* Cartel de Error */}
					{errorMessage && (
						<div
							role="alert"
							aria-live="assertive"
							aria-atomic="true"
							className="text-destructive bg-destructive/10 border-destructive/30 rounded-lg border p-3 text-sm font-medium"
						>
							{errorMessage}
						</div>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						aria-busy={isSubmitting}
						aria-label={isSubmitting ? "Procesando login" : "Botón entrar"}
						className="bg-primary text-primary-foreground shadow-primary/20 focus-visible:outline-ring mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90 focus-visible:ring-offset-2 focus-visible:outline-2 disabled:opacity-50"
					>
						<span>{isSubmitting ? "Entrando..." : "Entrar"}</span>
						<LogIn size={20} aria-hidden="true" />
					</Button>
				</form>

				<div className="border-border mt-8 border-t pt-6 text-center">
					<p className="text-muted-foreground text-sm">
						¿No tiene una cuenta?{" "}
						<Link
							href="/register"
							onClick={(e) => {
								if (isSubmitting) {
									e.preventDefault();
								}
							}}
							className="text-primary font-bold hover:underline"
						>
							Solicite acceso aquí
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

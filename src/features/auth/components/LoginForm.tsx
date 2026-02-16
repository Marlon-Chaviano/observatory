"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

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

				<form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
					{/* Usuario */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="username">Usuario o Correo Electrónico</Label>
						<div className="relative">
							<span className="material-symbols-outlined text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 [font-variation-settings:'FILL'_1]">
								person
							</span>
							<Input
								id="username"
								className="bg-background border-input h-12 pl-11"
								placeholder="nombre@ejemplo.com"
							/>
						</div>
					</div>

					{/* Contraseña */}
					<div className="flex flex-col gap-2 text-left">
						<Label htmlFor="password">Contraseña</Label>
						<div className="relative">
							<span className="material-symbols-outlined text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 [font-variation-settings:'FILL'_1]">
								lock
							</span>
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								className="bg-background border-input h-12 pr-11 pl-11"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 flex -translate-y-1/2 items-center transition-colors"
							>
								<span className="material-symbols-outlined text-xl [font-variation-settings:'FILL'_1]">
									{showPassword ? "visibility_off" : "visibility"}
								</span>
							</button>
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

					<Button
						type="submit"
						className="bg-primary text-primary-foreground shadow-primary/20 mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90"
					>
						<span>Entrar</span>
						<span className="material-symbols-outlined text-lg [font-variation-settings:'FILL'_1]">
							login
						</span>
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

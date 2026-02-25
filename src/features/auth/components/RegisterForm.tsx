"use client";

import { ArrowRight, CircleAlert, Mail, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/primitives/";
import { useRegitsterUser } from "@/features/auth/hooks/useRegitsterUser";

import { ROLES } from "../const/roles";
import { usePasswordToggle } from "../hooks";

import { AuthSwitchLink, InputField, RigthAddon, RoleSelector } from "./";

export const RegisterForm = () => {
	const { register, handleSubmit, errors, isSubmitting, errorMessage } = useRegitsterUser();
	const {
		showPassword: showPaswordOne,
		togglePasswordVisibility: togglePasswordVisibilityOne,
		inputType: inputTypeOne,
	} = usePasswordToggle();
	const {
		showPassword: showPasswordTwo,
		togglePasswordVisibility: togglePasswordVisibilityTwo,
		inputType: inputTypeTwo,
	} = usePasswordToggle();

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

				<form
					className="flex flex-col gap-5"
					onSubmit={handleSubmit}
					noValidate
					aria-label="Formulario de registro de usuario"
				>
					{/* Usuario */}
					<InputField
						name="username"
						label="Nombre de Usuario"
						field={register("username")}
						error={errors.username}
						placeholder="juan_perez"
						required
						icon={<User size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
						description="Entre 3 y 50 caracteres"
					/>

					{/* Email */}
					<InputField
						name="email"
						label="Correo Electrónico"
						type="email"
						field={register("email")}
						error={errors.email}
						placeholder="usuario@dominio.cu"
						required
						icon={<Mail size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold"
						description="Usaremos tu correo para verificación"
					/>

					{/* Password Group */}
					<fieldset className="grid grid-cols-1 gap-4 border-0 p-0 md:grid-cols-2">
						<legend className="sr-only">Campo de contraseña</legend>
						<InputField
							name="password"
							label="Contraseña"
							type={inputTypeOne}
							field={register("password")}
							error={errors.password}
							placeholder="••••••••"
							required
							description="Mínimo 8 caracteres"
							rightAddon={
								<RigthAddon
									showPassword={showPaswordOne}
									togglePasswordVisibility={togglePasswordVisibilityOne}
								/>
							}
						/>
						<InputField
							name="confirmPassword"
							label="Confirmar Contraseña"
							type={inputTypeTwo}
							field={register("confirmPassword")}
							error={errors.confirmPassword}
							placeholder="••••••••"
							required
							description="Debe coincidir con la contraseña anterior"
							rightAddon={
								<RigthAddon
									showPassword={showPasswordTwo}
									togglePasswordVisibility={togglePasswordVisibilityTwo}
								/>
							}
						/>
					</fieldset>

					{/* Rol */}
					<RoleSelector
						name="role"
						label="Seleccionar Rol"
						options={ROLES.map((role) => ({ id: role.value, label: role.label }))}
						field={register("role")}
						error={errors.role}
						required
						icon={<ShieldCheck size={18} strokeWidth={2.5} />}
						labelClassName="font-semibold text-foreground"
					/>
					{/* Cartel de Error */}
					{errorMessage && (
						<div
							role="alert"
							aria-live="assertive"
							aria-atomic="true"
							className="border-destructive/30 bg-destructive/10 text-destructive animate-in fade-in flex items-center gap-2 rounded-lg border p-3 text-sm duration-300"
						>
							<CircleAlert size={18} className="text-destructive" aria-hidden="true" />
							<span className="font-medium">{errorMessage}</span>
						</div>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						aria-busy={isSubmitting}
						aria-label={isSubmitting ? "Procesando registro" : "Botón registrarse"}
						className="bg-primary text-primary-foreground focus-visible:outline-ring mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-md transition-all hover:opacity-90 focus-visible:ring-offset-2 focus-visible:outline-2 active:scale-95"
					>
						<span>{isSubmitting ? "Registrando..." : "Registrarse"}</span>
						<ArrowRight size={20} aria-hidden="true" />
					</Button>
				</form>

				{/* Switch Login */}
				<AuthSwitchLink
					question="¿Ya tienes una cuenta?"
					text_action="Inicia sesión aquí"
					disabled={isSubmitting}
					url="/login"
				/>
			</div>
		</div>
	);
};

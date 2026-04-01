import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/primitives";
import { cn } from "@/lib/utils";

type Option = {
	id: string;
	label: string;
	description?: string;
};

type RoleSelectorProps = {
	name: string;
	label: string;
	options: Option[];
	field: UseFormRegisterReturn;
	error?: FieldError;
	required?: boolean;
	icon?: ReactNode;
	description?: string;
	containerClassName?: string;
	labelClassName?: string;
};

export function RoleSelector({
	name,
	label,
	options,
	field,
	error,
	required = false,
	icon,
	description,
	containerClassName,
	labelClassName,
}: RoleSelectorProps) {
	const errorId = `${name}-error`;
	const descriptionId = `${name}-description`;
	const groupId = `${name}-group`;
	const describedBy = [error ? errorId : null, description ? descriptionId : null]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={cn("flex flex-col gap-2 text-left", containerClassName)}>
			{/* Legend para agrupar los radios */}
			<fieldset className="border-0 p-0" role="radiogroup">
				<legend className={cn("text-foreground flex items-center gap-2 text-sm", labelClassName)}>
					{icon}
					{label}
					{required && (
						<span aria-label="requerido" className="text-destructive">
							*
						</span>
					)}
				</legend>

				{/* Descripción general del grupo */}
				{description && (
					<span id={descriptionId} className="text-muted-foreground text-sm">
						{description}
					</span>
				)}

				{/* Contenedor de opciones */}
				<div
					className="bg-muted border-border mt-2 flex flex-col gap-1 rounded-lg border p-1 sm:flex-row"
					id={groupId}
					aria-invalid={!!error}
					aria-required={required}
					aria-describedby={describedBy || undefined}
				>
					{options.map((option) => (
						<Label
							key={option.id}
							className="flex-1 cursor-pointer"
							htmlFor={`${name}-${option.id}`}
						>
							<Input
								id={`${name}-${option.id}`}
								type="radio"
								value={option.id}
								{...field}
								aria-label={
									option.description ? `${option.label}. ${option.description}` : option.label
								}
								className="peer hidden"
								required={required}
							/>

							<div
								className={cn(
									"text-muted-foreground peer-checked:bg-background peer-checked:text-primary peer-checked:hover:text-primary hover:text-foreground peer-focus-visible:ring-ring rounded-md border-2 border-transparent py-1.5 text-center text-xs font-semibold transition-all peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
									error && "peer-checked:border-destructive border-destructive/30"
								)}
							>
								{option.label}
							</div>
						</Label>
					))}
				</div>
			</fieldset>

			{/* Mensaje de error */}
			{error && (
				<span id={errorId} role="alert" className="text-destructive text-sm font-medium">
					{error.message}
				</span>
			)}
		</div>
	);
}

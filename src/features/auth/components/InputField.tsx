import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/primitives";
import { cn } from "@/lib/utils";

import { RegisterUserInput } from "../schemas/auth";

type InputFieldProps = {
	name: keyof RegisterUserInput;
	label: string;
	field: UseFormRegisterReturn;
	error?: FieldError;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	required?: boolean;
	icon?: ReactNode;
	description?: string;
	rightAddon?: ReactNode;
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
};

export const InputField = ({
	name,
	label,
	field,
	error,
	placeholder,
	type = "text",
	required = false,
	icon,
	description,
	rightAddon,
	containerClassName,
	labelClassName,
	inputClassName,
}: InputFieldProps) => {
	const errorId = `${name}-error`;
	const descriptionId = `${name}-description`;
	const describedBy = [error ? errorId : null, description ? descriptionId : null]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={cn("flex flex-col gap-2 text-left", containerClassName)}>
			<Label
				htmlFor={name}
				className={cn("text-foreground flex items-center gap-2", labelClassName)}
			>
				{icon}
				{label}
				{required && (
					<span aria-label="requerido" className="text-destructive">
						*
					</span>
				)}
			</Label>
			<div className="relative">
				<Input
					id={name}
					type={type}
					{...field}
					aria-invalid={!!error}
					aria-required={required}
					aria-describedby={describedBy || undefined}
					className={cn(
						"bg-background border-input h-12",
						error && "border-destructive focus:ring-destructive",
						rightAddon && "pr-11",
						inputClassName
					)}
					placeholder={placeholder}
					required={required}
				/>
				{rightAddon && (
					<div className="absolute top-1/2 right-3 -translate-y-1/2">{rightAddon}</div>
				)}
			</div>
			{description && (
				<span id={descriptionId} className="text-muted-foreground text-sm">
					{description}
				</span>
			)}
			{error && (
				<span id={errorId} role="alert" className="text-destructive text-sm font-medium">
					{error.message}
				</span>
			)}
		</div>
	);
};

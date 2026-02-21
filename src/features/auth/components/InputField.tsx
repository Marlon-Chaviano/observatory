import { ReactNode } from "react";

import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";
import { cn } from "@/lib/utils";

import { RegisterUserInput } from "../squemas/register-user";

type InputFieldProps = {
	name: keyof RegisterUserInput;
	label: string;
	value: string;
	onChange: (name: keyof RegisterUserInput, value: string) => void;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	required?: boolean;
	icon?: ReactNode;
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
};

export const InputField = ({
	name,
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	required = false,
	icon,
	containerClassName,
	labelClassName,
	inputClassName,
}: InputFieldProps) => {
	return (
		<div className={cn("flex flex-col gap-2 text-left", containerClassName)}>
			<Label
				htmlFor={name}
				className={cn("text-foreground flex items-center gap-2", labelClassName)}
			>
				{icon}
				{label}
			</Label>
			<Input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				className={cn("bg-background border-input h-12", inputClassName)}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
};

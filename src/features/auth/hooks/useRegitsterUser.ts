import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError } from "@/lib/api";

import { DEFAULT_AUTH_VALUES } from "../const/default-values";
import { RegisterUserInput, registerUserSchema } from "../schemas/auth";
import { signUp } from "../service";

export const useRegitsterUser = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit: handleSubmitForm,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegisterUserInput>({
		resolver: zodResolver(registerUserSchema),
		defaultValues: DEFAULT_AUTH_VALUES,
	});

	const onSubmit = async (data: RegisterUserInput) => {
		const { confirmPassword: _confirmPassword, ...payload } = data;

		try {
			await signUp(payload);
			reset();
			router.push("/");
		} catch (error) {
			if (error instanceof ApiError) {
				setErrorMessage(error.response?.message || "Error de API");
			} else {
				setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
			}
		}
	};

	return {
		register,
		handleSubmit: handleSubmitForm(onSubmit),
		errors,
		isSubmitting,
		errorMessage,
	};
};

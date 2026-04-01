import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError } from "@/lib/api";

import { DEFAULT_AUTH_VALUES } from "../const/default-values";
import { LoginUserInput, loginUserSchema } from "../schemas/auth";
import { signIn } from "../service";

export const useLoginUser = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit: handleSubmitForm,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<LoginUserInput>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: DEFAULT_AUTH_VALUES.email,
			password: DEFAULT_AUTH_VALUES.password,
			role: DEFAULT_AUTH_VALUES.role,
		},
	});

	const onSubmit = async (data: LoginUserInput) => {
		setErrorMessage(null);

		try {
			await signIn(data);
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

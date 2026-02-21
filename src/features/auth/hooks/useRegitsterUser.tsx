import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "@/lib/api";

import { signUp } from "../service";
import { RegisterUserInput, registerUserSchema } from "../squemas/register-user";

type RegisterAction =
	| {
			type: "SET_FIELD";
			payload: {
				field: keyof RegisterUserInput;
				value: string;
			};
	  }
	| { type: "RESET_FORM" };

const INITIAL_FORM_STATE: RegisterUserInput = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "observer",
};

const registerFormReducer = (
	state: RegisterUserInput,
	action: RegisterAction
): RegisterUserInput => {
	switch (action.type) {
		case "SET_FIELD":
			return {
				...state,
				[action.payload.field]: action.payload.value,
			};
		case "RESET_FORM":
			return INITIAL_FORM_STATE;
		default:
			return state;
	}
};

type Status = {
	status: "idle" | "loading" | "success" | "error";
	message: string | null;
};

export const useRegitsterUser = () => {
	const [formData, dispatch] = useReducer(registerFormReducer, INITIAL_FORM_STATE);
	const [status, setStatus] = useState<Status>({
		status: "idle",
		message: null,
	});
	const router = useRouter();

	const onSubmit = async () => {
		setStatus({ status: "loading", message: null });

		const validationResult = registerUserSchema.safeParse(formData);
		if (!validationResult.success) {
			const firstIssue = validationResult.error.issues[0];
			setStatus({
				status: "error",
				message: firstIssue?.message ?? "Datos inválidos en el formulario",
			});
			return;
		}

		const { confirmPassword: _confirmPassword, ...payload } = validationResult.data;

		try {
			await signUp(payload);
			setStatus({ status: "success", message: "Usuario registrado exitosamente" });
			router.push("/");
		} catch (error) {
			if (error instanceof ApiError) {
				setStatus({
					status: "error",
					message: error.response?.message || "Error de API",
				});
			} else {
				setStatus({
					status: "error",
					message: error instanceof Error ? error.message : "Error desconocido",
				});
			}
		}
	};

	return {
		formData,
		dispatch,
		status,
		onSubmit,
	};
};

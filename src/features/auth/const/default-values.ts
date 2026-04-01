import { RegisterUserInput } from "../schemas/auth";

export const DEFAULT_AUTH_VALUES: RegisterUserInput = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "observer",
};

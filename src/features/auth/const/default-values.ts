import { RegisterUserInput } from "../schemas/auth";

export const DEFAULT_REGISTER_VALUES: RegisterUserInput = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "observer",
};

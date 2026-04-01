import { useState } from "react";

export const usePasswordToggle = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const resetPasswordVisibility = () => {
		setShowPassword(false);
	};

	return {
		showPassword,
		togglePasswordVisibility,
		resetPasswordVisibility,
		inputType: showPassword ? "text" : "password",
	};
};

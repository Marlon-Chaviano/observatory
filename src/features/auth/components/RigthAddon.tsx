import { Eye, EyeOff } from "lucide-react";

export const RigthAddon = ({
	showPassword,
	togglePasswordVisibility,
}: {
	showPassword: boolean;
	togglePasswordVisibility: () => void;
}) => {
	return (
		<button
			type="button"
			onClick={togglePasswordVisibility}
			aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
			className="text-muted-foreground hover:text-primary focus-visible:outline-ring flex cursor-pointer items-center rounded p-1 transition-colors focus-visible:ring-offset-2 focus-visible:outline-2"
		>
			{showPassword ? (
				<Eye size={20} aria-hidden="true" />
			) : (
				<EyeOff size={20} aria-hidden="true" />
			)}
		</button>
	);
};

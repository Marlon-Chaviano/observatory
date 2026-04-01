import React from "react";

import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function LoginPage() {
	return (
		<main className="bg-background-light dark:bg-background-dark flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-4">
			<RegisterForm />
		</main>
	);
}

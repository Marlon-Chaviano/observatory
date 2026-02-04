import React from "react";

export default function LoginBanner() {
	return (
		<div className="relative">
			<div className="absolute -top-8 right-0 left-0 z-30 flex justify-center px-4">
				<a
					className="bg-primary hover:bg-secondary group flex transform items-center gap-3 rounded-full px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105"
					href="/login"
				>
					Inicia Sesión en nuestro observatorio
					<span className="text-primary rounded-full bg-white p-1 transition-transform group-hover:translate-x-1">
						<span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
					</span>
				</a>
			</div>
		</div>
	);
}

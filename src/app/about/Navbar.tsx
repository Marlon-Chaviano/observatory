import React from "react";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/95">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="material-symbols-outlined text-primary text-4xl">volcano</span>
						<div className="flex flex-col">
							<span className="font-display text-sm leading-none font-bold tracking-wider text-slate-900 md:text-base dark:text-white">
								MINISTERIO DE
							</span>
							<span className="font-display text-base leading-none font-bold tracking-wider text-slate-900 md:text-xl dark:text-white">
								ENERGÍA Y MINAS<span className="text-primary">.</span>
							</span>
						</div>
					</div>
					<div className="hidden items-center space-x-8 md:flex">
						<a
							className="hover:text-primary font-medium text-slate-600 transition-colors dark:text-slate-300"
							href="/servicios"
						>
							Servicios
						</a>
						<a
							className="hover:text-primary font-medium text-slate-600 transition-colors dark:text-slate-300"
							href="/boletines"
						>
							Boletines
						</a>
						<a className="text-primary border-primary border-b-2 pb-1 font-bold" href="/about">
							Sobre Nosotros
						</a>
					</div>
					<div>
						<button className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black">
							Iniciar Sesión
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

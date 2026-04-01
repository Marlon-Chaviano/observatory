import React from "react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-gray-800 bg-black pt-24 pb-8 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
					{/* Logo/frase */}
					<div className="col-span-1 lg:col-span-1">
						<div className="mb-4 flex items-center gap-2">
							<span className="material-symbols-outlined text-primary text-3xl">volcano</span>
							<span className="font-display text-xl font-bold">
								Ministerio de Energía y Minas de Cuba
							</span>
						</div>
						<p className="mb-4 text-sm text-gray-400 italic">
							&ldquo;El verdadero progreso es el que pone la tecnología al alcance de todos.&rdquo;
						</p>
						<p className="text-primary text-xs font-bold">- Thomas Edison</p>
					</div>
					{/* Páginas */}
					<div>
						<h4 className="font-display mb-4 text-lg font-bold">Páginas</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<Link className="hover:text-primary transition-colors" href="/">
									Inicio
								</Link>
							</li>
							<li>
								<Link className="hover:text-primary transition-colors" href="/servicios">
									Servicios
								</Link>
							</li>
							<li>
								<Link className="hover:text-primary transition-colors" href="/boletines">
									Boletines
								</Link>
							</li>
						</ul>
					</div>
					{/* Sobre Nosotros */}
					<div>
						<h4 className="font-display mb-4 text-lg font-bold opacity-0">.</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<Link className="hover:text-primary transition-colors" href="/about">
									Sobre Nosotros
								</Link>
							</li>
						</ul>
					</div>
					{/* Redes sociales - Enlaces externos */}
					<div>
						<h4 className="font-display mb-4 text-lg font-bold">Redes Sociales</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<a
									className="hover:text-primary flex items-center gap-2 transition-colors"
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="material-symbols-outlined text-lg">public</span>
									Facebook
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary flex items-center gap-2 transition-colors"
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="material-symbols-outlined text-lg">photo_camera</span>
									Instagram
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary flex items-center gap-2 transition-colors"
									href="https://x.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="material-symbols-outlined text-lg">alternate_email</span>
									X.com
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* Suscripción y derechos */}
				<div className="flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row">
					<form className="flex w-full overflow-hidden rounded-lg bg-white md:w-auto">
						<div className="flex items-center pl-3 text-gray-400">
							<span className="material-symbols-outlined">mail</span>
						</div>
						<input
							className="w-full border-0 px-4 py-2 text-slate-800 focus:ring-0 md:w-64"
							placeholder="E-Mail"
							type="email"
						/>
						<button
							className="bg-primary hover:bg-secondary px-6 py-2 text-sm font-medium text-white transition-colors"
							type="submit"
						>
							Subscribirse al Boletín
						</button>
					</form>
					<p className="text-xs text-gray-500">2024. Todos los derechos reservados</p>
				</div>
			</div>
		</footer>
	);
}

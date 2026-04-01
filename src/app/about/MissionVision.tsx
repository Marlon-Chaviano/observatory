import React from "react";

export default function MissionVision() {
	return (
		<section className="relative">
			<div className="split-bg-desktop absolute inset-0 hidden lg:block"></div>
			<div className="bg-background-dark absolute inset-0 lg:hidden"></div>
			<div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
					<div className="text-white lg:col-span-5">
						<h2 className="font-display mb-6 text-3xl font-bold md:text-4xl">
							Sobre Nuestra Misión.
						</h2>
						<p className="mb-8 text-lg leading-relaxed text-slate-300">
							Facilitar el acceso a información tecnológica actualizada en los sectores de minería y
							energía, apoyando la toma de decisiones estratégicas y fomentando el desarrollo
							sostenible de Cuba. A través de la innovación y la investigación, aspiramos a ser una
							fuente confiable de conocimiento técnico y científico.
						</p>
					</div>
					<div className="flex justify-center lg:col-span-2">
						<div className="dark:bg-surface-dark border-primary relative z-20 flex h-40 w-40 items-center justify-center rounded-full border-8 bg-white shadow-2xl md:h-48 md:w-48">
							<span className="material-symbols-outlined text-primary text-6xl md:text-7xl">
								ads_click
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-6 lg:col-span-5">
						<div className="bg-primary transform rounded-2xl p-8 text-white shadow-xl transition-transform hover:-translate-y-1">
							<h3 className="font-display mb-3 flex items-center gap-2 text-2xl font-bold">
								Misión
							</h3>
							<p className="leading-relaxed text-red-100">
								Facilitar el acceso a información actualizada sobre avances tecnológicos en minería
								y energía en Cuba.
							</p>
						</div>
						<div className="dark:bg-surface-dark transform rounded-2xl border border-gray-300 bg-gray-200 p-8 shadow-lg transition-transform hover:-translate-y-1 dark:border-gray-700">
							<h3 className="font-display mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
								Visión
							</h3>
							<p className="leading-relaxed text-slate-600 dark:text-slate-300">
								Ser un referente en la divulgación de innovaciones tecnológicas en minería y energía
								en el país.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

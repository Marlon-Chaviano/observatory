import React from "react";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative h-150 w-full overflow-hidden">
			<Image
				src="/unnamed.png"
				alt="Reunión de equipo sobre mesa de madera"
				className="absolute inset-0 h-full w-full object-cover"
				fill
				priority
				unoptimized
			/>
			<div className="hero-gradient absolute inset-0 bg-black/40" />
			<div className="relative z-10 flex h-full items-center justify-center px-4">
				<div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/60 p-8 text-center shadow-2xl backdrop-blur-sm md:p-12 dark:bg-black/70">
					<h1 className="font-display mb-6 text-4xl font-bold text-white md:text-5xl">
						¿Quiénes Somos?
					</h1>
					<p className="text-lg leading-relaxed font-light text-slate-200 md:text-xl">
						El Observatorio Tecnológico del Ministerio de Energía y Minas (MINEM) es una plataforma
						dedicada a monitorear, analizar y divulgar las innovaciones tecnológicas en los sectores
						de minería y energía en Cuba. Nuestro objetivo es proporcionar a investigadores,
						profesionales del sector y entidades gubernamentales acceso a información actualizada
						sobre los avances más relevantes en estas áreas.
					</p>
				</div>
			</div>
		</section>
	);
}

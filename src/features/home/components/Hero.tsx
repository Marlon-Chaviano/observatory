// src/features/home/components/Hero.tsx
export const Hero = () => {
	return (
		<section className="relative w-full">
			<div
				className="relative flex min-h-[500px] w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-16"
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/wind_farm.png')`,
				}}
			>
				<div className="flex max-w-[1000px] flex-col gap-6 text-center">
					<div className="mb-2 inline-flex items-center self-center rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
						HUB CENTRAL DE DATOS
					</div>
					<h1 className="text-4xl leading-tight font-extrabold text-white drop-shadow-md md:text-5xl lg:text-7xl">
						Observatorio Cubano de <br />
						<span className="text-red-500">ENERGÍA Y MINAS</span>
					</h1>
					<p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-gray-100 md:text-xl">
						Plataforma estratégica para la soberanía energética y el desarrollo minero sostenible.
						Información en tiempo real para la toma de decisiones.
					</p>
					<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<div className="group relative w-full max-w-lg">
							<input
								type="text"
								className="h-14 w-full rounded-full border-none bg-white/95 pr-6 pl-14 text-lg text-black shadow-2xl transition-all focus:ring-2 focus:ring-red-600"
								placeholder="Buscador inteligente de recursos..."
							/>
							<span className="material-symbols-outlined group-focus-within:text-primary absolute top-1/2 left-5 -translate-y-1/2 !text-[28px] text-gray-400 transition-colors">
								search
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

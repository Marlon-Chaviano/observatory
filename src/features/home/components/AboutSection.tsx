// src/features/home/components/AboutSection.tsx
import Image from "next/image";

export const AboutSection = () => {
	return (
		<section className="bg-background-alt border-y border-gray-200 py-20" id="quienes-somos">
			<div className="mx-auto max-w-[1200px] px-6">
				<div className="flex flex-col items-center gap-16 lg:flex-row">
					<div className="order-2 flex-1 lg:order-1">
						<div className="relative overflow-hidden rounded-2xl border-8 border-white shadow-2xl">
							<Image
								src="/map.png"
								alt="Infraestructura Energética"
								width={500}
								height={300}
								className="h-auto w-full"
							/>
						</div>
					</div>
					<div className="order-1 flex flex-1 flex-col gap-6 lg:order-2">
						<span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
							Institucional
						</span>
						<h2 className="text-3xl leading-tight font-black text-gray-900 md:text-5xl">
							¿Quiénes Somos?
						</h2>
						<p className="text-lg leading-relaxed text-gray-600">
							El <strong>Observatorio Cubano de Energía y Minas (OCEM)</strong> es el centro
							neurálgico para la recopilación, análisis y difusión de información técnica y
							estratégica.
						</p>
						<p className="leading-relaxed text-gray-600">
							Nuestra misión es proveer una visión integral del panorama minero-energético de la
							nación, facilitando el monitoreo de recursos, la planificación prospectiva y el
							soporte científico-tecnológico al Ministerio de Energía y Minas.
						</p>
						<div className="flex gap-4 pt-4">
							<button className="rounded-lg bg-gray-900 px-8 py-3 font-bold text-white transition-all hover:bg-gray-800">
								Leer Más
							</button>
							<button className="border-primary text-primary hover:bg-primary rounded-lg border-2 px-8 py-3 font-bold transition-all hover:text-white">
								Documentos Oficiales
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

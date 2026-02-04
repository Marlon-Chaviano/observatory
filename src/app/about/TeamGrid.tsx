import React from "react";
import Image from "next/image";

const teamMembers = [
	{
		name: "Ismarys Salgado Machin",
		position: "La Habana, Cuba",
		icon: "person",
		description:
			"Especialista con amplia trayectoria en gestión de patentes, servicios de información, la gestión de la innovación y los procesos editoriales.",
	},
	{
		name: "Jose Manuel",
		position: "Ing. Eléctrico",
		icon: "bolt",
		description:
			"Departamento de Energía. Especialista en redes de alta tensión y optimización energética.",
	},
	{
		name: "Alberto Moreno",
		position: "Ing. Minas",
		icon: "landscape",
		description:
			"Departamento de Minería. Experto en análisis geológico y sostenibilidad ambiental.",
		img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj6ZwyUvJhCnQ6EFjnyxeqAnkJdQdgBbl-sCz9QFAMbv_K5VU9oY1lbe9Z_5Kr_OZ_1OBGLNi5tvFMLwMuGfdbgSBePEmfGeS_KNXL9O0zxDJ7LeKWpDffn1jhSYQmrXo62g96ih19-FaA6ZjYnngL7e-eipXQdrFAMYSpoqavzj4C-sdofjlyXtAZkKkEPUhG3Th5VYR3w6LOFov2s3aA8mFTarmf1dRIzvatz3OW1VOle83xEZXpzzCOynl_CsPStU0q4mX3SHm-",
	},
	{
		name: "Laura Hernández",
		position: "Geóloga Senior",
		icon: "public",
		description:
			"Especialista en cartografía geológica y evaluación de recursos minerales. Experta en sistemas de información geográfica.",
	},
	{
		name: "Carlos Rodríguez",
		position: "Analista de Datos",
		icon: "analytics",
		description:
			"Encargado del análisis estadístico de la producción minera y energética. Experto en minería de datos y predicción.",
	},
	{
		name: "Elena García",
		position: "Comunicadora",
		icon: "campaign",
		description:
			"Responsable de la divulgación científica y relaciones públicas. Gestión de contenidos y comunicación estratégica.",
	},
	{
		name: "Roberto Sánchez",
		position: "Ing. de Sistemas",
		icon: "computer",
		description:
			"Especialista en ciberseguridad y arquitectura de software para infraestructuras críticas.",
	},
	{
		name: "Ana Torres",
		position: "Asesora Legal",
		icon: "gavel",
		description:
			"Experta en derecho minero y regulaciones energéticas internacionales y cumplimiento normativo.",
	},
	{
		name: "Miguel Ángel",
		position: "Gestor de Proyectos",
		icon: "engineering",
		description:
			"Certificado PMP con experiencia en coordinación de proyectos de exploración y explotación minera.",
	},
];

export default function TeamGrid() {
	return (
		<section className="bg-background-light dark:bg-background-dark py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="font-display border-primary mb-12 border-l-4 pl-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
					Equipo de Trabajo
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{teamMembers.map(({ name, position, icon, description, img }) => (
						<div
							key={name}
							className="group from-primary relative overflow-hidden rounded-2xl bg-linear-to-b via-[#500e16] to-black pt-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<div className="relative flex h-80 w-full items-end justify-center overflow-hidden">
								{img ? (
									<Image
										src={img}
										alt={name}
										className="h-full transform object-cover object-top transition-transform duration-500 group-hover:scale-105"
										width={400}
										height={320}
										unoptimized
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-700">
										<span className="material-symbols-outlined text-6xl text-gray-500">person</span>
									</div>
								)}
							</div>
							<div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
											{name}
										</h3>
										<p className="text-primary mt-1 text-xs font-semibold tracking-wider uppercase">
											{position}
										</p>
									</div>
									<div className="bg-primary/10 rounded-lg p-2">
										<span className="material-symbols-outlined text-primary">{icon}</span>
									</div>
								</div>
								<div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
									<p className="line-clamp-3 text-xs leading-relaxed text-slate-600 transition-all group-hover:line-clamp-none dark:text-slate-400">
										{description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

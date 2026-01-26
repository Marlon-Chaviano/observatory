// src/features/home/components/ModuleGrid.tsx
import Link from "next/link";

const modules = [
	{
		title: "Buscador Inteligente",
		icon: "travel_explore",
		description: "Localización avanzada de documentación técnica y datos históricos mediante IA.",
	},
	{
		title: "Geoportal de Cuba",
		icon: "map",
		description: "Visualización espacial de la infraestructura energética y recursos minerales.",
	},
	{
		title: "Estadísticas",
		icon: "analytics",
		description: "Dashboards interactivos y visualización de indicadores clave del sector.",
	},
	{
		title: "Boletines Temáticos",
		icon: "description",
		description: "Publicaciones periódicas sobre el estado y tendencias de la energía y minas.",
	},
	{
		title: "Gestión IA",
		icon: "psychology",
		description: "Herramientas de predicción y modelado de datos mediante redes neuronales.",
	},
	{
		title: "Alertas Críticas",
		icon: "notifications_active",
		description: "Monitoreo de umbrales críticos y gestión de contingencias en tiempo real.",
		isUrgent: true,
	},
	{
		title: "Registro de Fuentes",
		icon: "database",
		description: "Control y validación de las fuentes de datos primarias integradas al sistema.",
	},
	{
		title: "Administración",
		icon: "admin_panel_settings",
		description: "Configuración del sistema, roles de usuario y auditoría de seguridad.",
	},
];

export const ModuleGrid = () => {
	return (
		<section className="flex grow flex-col bg-white py-16" id="modulos">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col px-6">
				<div className="flex flex-col gap-3 pb-12 text-center md:text-left">
					<h2 className="border-primary border-l-4 pl-4 text-3xl font-black text-gray-900 md:text-4xl">
						Módulos Estratégicos y Operativos
					</h2>
					<p className="ml-5 max-w-2xl text-gray-500">
						Acceda de forma segura a las herramientas de análisis, monitoreo y gestión del sector
						minero-energético nacional.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{modules.map((item, index) => (
						<Link
							key={index}
							href="/"
							className={`group flex flex-col gap-5 rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
								item.isUrgent
									? "hover:border-primary/40 border-red-100 bg-red-50"
									: "hover:border-primary/20 border-gray-100 bg-gray-50 hover:bg-white"
							}`}
						>
							<div
								className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-all ${
									item.isUrgent
										? "bg-primary text-white"
										: "text-primary group-hover:bg-primary bg-white group-hover:text-white"
								}`}
							>
								<span className="material-symbols-outlined text-3xl">{item.icon}</span>
							</div>
							<div>
								<h3
									className={`mb-2 text-xl font-bold ${item.isUrgent ? "text-red-700" : "text-gray-900"}`}
								>
									{item.title}
								</h3>
								<p
									className={`text-sm leading-relaxed ${item.isUrgent ? "text-red-900/70" : "text-gray-600"}`}
								>
									{item.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

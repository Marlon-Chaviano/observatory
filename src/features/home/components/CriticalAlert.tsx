// src/features/home/components/CriticalAlert.tsx
import Link from "next/link";

export const CriticalAlert = () => {
	return (
		<section className="w-full border-b border-red-100 bg-red-50 px-6 py-3">
			<div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
				<div className="flex items-center gap-4">
					<span className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
						<span className="material-symbols-outlined fill-1">warning</span>
					</span>
					<div>
						<h4 className="text-sm font-bold tracking-tight text-red-700 uppercase">
							Centro de Alertas Críticas
						</h4>
						<p className="text-xs font-medium text-red-900">
							Monitoreo activo: No se reportan incidencias críticas en el SEN en este momento.
						</p>
					</div>
				</div>
				<Link
					href="/"
					className="text-primary flex items-center gap-1 text-xs font-bold transition-colors hover:text-red-700"
				>
					ACCEDER AL PANEL DE CONTROL{" "}
					<span className="material-symbols-outlined text-sm">arrow_forward</span>
				</Link>
			</div>
		</section>
	);
};

import { ContactSection } from "@/features/home/components/ContactSection";

export default function ContactPage() {
	return (
		<main className="flex min-h-[80vh] flex-col">
			<section className="bg-background-alt border-b border-gray-200">
				<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 py-14">
					<span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
						Contacto
					</span>
					<h1 className="text-3xl font-black text-gray-900 md:text-5xl">Estamos para ayudarte</h1>
					<p className="max-w-2xl text-base text-gray-600 md:text-lg">
						Escríbenos para consultas técnicas, solicitudes de información o reportes
						institucionales. Nuestro equipo responde en horario laboral.
					</p>
				</div>
			</section>

			<ContactSection />
		</main>
	);
}

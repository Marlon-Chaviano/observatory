import { AboutSection } from "@/features/home/components/AboutSection";
import { ContactSection } from "@/features/home/components/ContactSection";
import { CriticalAlert } from "@/features/home/components/CriticalAlert";
import { Hero } from "@/features/home/components/Hero";
import { ModuleGrid } from "@/features/home/components/ModuleGrid";

export default function Home() {
	return (
		<main>
			<Hero />
			<CriticalAlert />
			<ModuleGrid />
			<AboutSection />
			<ContactSection />
		</main>
	);
}

// Page temporal para verificar el funcionamiento del Navbar
import Footer from "./Footer";
import Hero from "./Hero";
import LoginBanner from "./LoginBanner";
import MissionVision from "./MissionVision";
import Navbar from "./Navbar";
import TeamGrid from "./TeamGrid";
export default function AboutPage() {
	return (
		<>
			<Navbar />
			<Hero />
			<MissionVision />
			<TeamGrid />
			<LoginBanner />
			<Footer />
		</>
	);
}

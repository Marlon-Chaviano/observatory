import { Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";

// Información del footer del sitio web
export const FOOTER_INFO = {
	description: `Órgano rector del sector energético y minero en la República de Cuba. Liderando la
transición hacia una matriz energética sostenible.`,
	modules_title: "Módulos",
	security_title: "Seguridad",
	contact_title: "Ubicación",
	contact_items: [
		{
			icon: MapPin,
			text: "Avenida Salvador Allende No. 655, Plaza de la Revolución, La Habana, Cuba.",
		},
		{
			icon: Phone,
			text: "+53 7 836 1234",
		},
	],
	copyrigtht_text: `© 2026 MINISTERIO DE ENERGÍA Y MINAS. TODOS LOS DERECHOS RESERVADOS.`,
	shared_link: [
		{
			icon: Globe,
			href: "https://www.minem.gob.cu",
		},
		{
			icon: Mail,
			href: "mailto:info@minem.gob.cu",
		},
		{
			icon: Share2,
			href: "https://www.minem.gob.cu/compartir",
		},
	],
};

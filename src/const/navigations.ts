import { NavigationItem } from "@/types/navigations";

export const NAVIGATION_MAIN: NavigationItem[] = [
	{ label: "Inicio", href: "/" },
	{ label: "Quiénes Somos", href: "/about" },
	{ label: "Contacto", href: "/contact" },
	{ label: "Módulos", href: "/modules" },
];

export const NAVIGATION_CTA: NavigationItem = {
	label: "Acceso Intranet",
	href: "/intranet_acces",
};

export const NAVIGATION_MODULES: NavigationItem[] = [
	{ label: "Buscador Inteligente", href: "/modules/smart_search" },
	{ label: "Geoportal Nacional", href: "/modules/national_geoportal" },
	{ label: "Estadísticas Sectoriales", href: "/modules/sector_statistics" },
	{ label: "Boletines Técnicos", href: "/modules/technical_bulletins" },
	{ label: "Gestión con IA", href: "/modules/ai_management" },
];

export const NAVIGATION_SECURITY: NavigationItem[] = [
	{ label: "Centro de Alertas", href: "/security/alert_center" },
	{ label: "Registro de Usuarios", href: "/security/user_registration" },
	{ label: "Política de Privacidad", href: "/security/privacy_policy" },
	{ label: "Soporte Técnico", href: "/security/technical_support" },
];

export const NAVIGATION_FOOTER_LEGAL: NavigationItem[] = [
	{ label: "Aviso Legal", href: "/legal_notice" },
	{ label: "Mapa del Sitio", href: "/site_map" },
];

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

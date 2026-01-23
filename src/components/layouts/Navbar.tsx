"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAVIGATION_CTA, NAVIGATION_MAIN } from "@/const";

export function Navbar() {
	const [open, setOpen] = useState(false);

	function closeMenu() {
		setOpen(false);
	}

	return (
		<>
			<header className="fixed top-0 left-0 z-50 w-full shadow-sm">
				<nav className="bg-background mx-auto flex max-w-7xl items-center justify-between rounded-b-xl px-4 py-3">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<Image src={"/window.svg"} alt="Logo" width={40} height={40} />
					</div>

					{/* Links desktop */}
					<div className="flex gap-5">
						<ul className="text-foreground hidden items-center gap-8 text-sm font-medium md:flex">
							{NAVIGATION_MAIN.map((item) => (
								<LinksItems
									key={item.href}
									title={item.label}
									href={item.href}
									handleCloseMenu={closeMenu}
								/>
							))}
						</ul>
						{/* Botón desktop */}
						<div className="hidden md:block">
							<Link
								href={NAVIGATION_CTA.href}
								className="bg-chart-1 text-background hover:bg-chart-1/70 rounded-md px-4 py-2 text-sm font-semibold transition"
								onClick={closeMenu}
							>
								{NAVIGATION_CTA.label}
							</Link>
						</div>
					</div>

					{/* Botón hamburguesa */}
					<button onClick={() => setOpen(!open)} className="text-foreground text-2xl md:hidden">
						☰
					</button>
				</nav>
			</header>

			{/* Menú móvil overlay */}
			{open && (
				<div className="bg-background fixed top-16 left-0 z-40 w-full shadow-lg md:hidden">
					<ul className="text-foreground flex flex-col gap-5 p-6 font-medium">
						{NAVIGATION_MAIN.map((item) => (
							<LinksItems
								key={item.href}
								title={item.label}
								href={item.href}
								handleCloseMenu={closeMenu}
							/>
						))}
						<Link
							href={NAVIGATION_CTA.href}
							onClick={closeMenu}
							className="bg-chart-1 text-background hover:bg-chart-1/70 rounded-md py-2 text-center font-semibold transition"
						>
							{NAVIGATION_CTA.label}
						</Link>
					</ul>
				</div>
			)}

			{/* Espaciador para que el contenido no quede oculto bajo el navbar */}
			<div className="h-16" />
		</>
	);
}
function LinksItems({
	title,
	href,
	handleCloseMenu,
}: {
	title: string;
	href: string;
	handleCloseMenu?: () => void;
}) {
	return (
		<li>
			<Link href={href} onClick={handleCloseMenu}>
				{title}
			</Link>
		</li>
	);
}

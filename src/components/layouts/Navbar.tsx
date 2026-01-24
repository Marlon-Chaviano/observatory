"use client";

import { useState } from "react";
import Link from "next/link";

import { NAVIGATION_CTA, NAVIGATION_MAIN } from "@/const";

import Logo from "./Logo";

export function Navbar() {
	const [open, setOpen] = useState(false);

	function closeMenu() {
		setOpen(false);
	}

	return (
		<>
			<header className="fixed top-0 left-0 z-50 w-full shadow-sm">
				<nav
					className="bg-background mx-auto flex max-w-7xl items-center justify-between rounded-b-xl px-4 py-3"
					aria-label="Navegación principal"
				>
					{/* Logo */}
					<Logo />

					{/*Main Links desktop */}
					<div className="flex gap-5">
						<ul className="text-foreground hidden items-center gap-8 text-sm font-medium md:flex">
							{NAVIGATION_MAIN.map((item) => (
								<li key={item.href}>
									<Link href={item.href} onClick={closeMenu}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>

						{/* CTA link desktop */}
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
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className="text-foreground text-2xl md:hidden"
						aria-label="Abrir menú de navegación"
						aria-expanded={open}
						aria-controls="mobile-navigation"
					>
						☰
					</button>
				</nav>
			</header>

			{/* Menú móvil overlay */}
			<nav
				id="mobile-navigation"
				aria-label="Navegación móvil"
				className={`bg-background fixed top-16 left-0 z-40 w-full shadow-lg transition md:hidden ${
					open ? "block" : "hidden"
				}`}
			>
				<ul className="text-foreground flex flex-col gap-5 p-6 font-medium">
					{NAVIGATION_MAIN.map((item) => (
						<li key={item.href}>
							<Link href={item.href} onClick={closeMenu}>
								{item.label}
							</Link>
						</li>
					))}
					<Link
						href={NAVIGATION_CTA.href}
						onClick={closeMenu}
						className="bg-chart-1 text-background hover:bg-chart-1/70 rounded-md py-2 text-center font-semibold transition"
					>
						{NAVIGATION_CTA.label}
					</Link>
				</ul>
			</nav>

			{/* Espaciador para que el contenido no quede oculto bajo el navbar */}
			<div className="h-16" />
		</>
	);
}

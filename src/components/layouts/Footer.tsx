import Link from "next/link";

import {
	FOOTER_INFO,
	NAVIGATION_FOOTER_LEGAL,
	NAVIGATION_MODULES,
	NAVIGATION_SECURITY,
} from "@/const";

import Logo from "./Logo";

// Title component for footer sections
function TitleText({ title }: { title: string }) {
	return <h3 className="mb-6 text-lg font-semibold">{title}</h3>;
}

export function Footer() {
	return (
		<footer className="bg-foreground text-background">
			{/* Main Footer Content */}
			<div className="mx-auto max-w-7xl px-6 py-16">
				<div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
					{/* Logo and Description */}
					<section aria-label="Información institucional" className="flex flex-col">
						<div className="mb-4 flex items-center gap-3">
							<Logo width={50} height={50} />
						</div>
						<p className="text-sm leading-relaxed">{FOOTER_INFO.description}</p>
						<div className="mt-4 flex gap-4">
							{/* Shared links */}
							{FOOTER_INFO.shared_link.map((link, index) => (
								<a
									key={index}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:bg-background/20 cursor-pointer rounded-lg p-2 transition"
								>
									<link.icon size={18} />
								</a>
							))}
						</div>
					</section>

					{/* Modules */}
					<nav aria-label="Módulos principales">
						<TitleText title={FOOTER_INFO.modules_title} />
						<ul className="space-y-3">
							{/* Modules links */}
							{NAVIGATION_MODULES.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-background/60 hover:text-background text-sm transition"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Security */}
					<nav aria-label="Enlaces legales y seguridad">
						<TitleText title={FOOTER_INFO.security_title} />
						<ul className="space-y-3">
							{/* Security links */}
							{NAVIGATION_SECURITY.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-background/60 hover:text-background text-sm transition"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Location */}
					<section aria-label="Información de contacto">
						<TitleText title={FOOTER_INFO.contact_title} />
						<address className="flex flex-col gap-2 not-italic">
							{/* Contact info */}
							{FOOTER_INFO.contact_items.map((item, index) => (
								<div key={index} className="flex gap-3">
									<item.icon size={20} className="text-chart-1 mt-1 shrink-0" />
									<p className="text-background text-sm leading-relaxed">{item.text}</p>
								</div>
							))}
						</address>
					</section>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className="border-background/40 border-t">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 md:flex-row">
					<p className="text-background/40 text-xs">{FOOTER_INFO.copyrigtht_text}</p>
					<nav aria-label="Enlaces secundarios" className="mt-4 flex gap-6 md:mt-0">
						{/* Footer legal links */}
						{NAVIGATION_FOOTER_LEGAL.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-background/60 hover:text-background text-xs uppercase transition"
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}

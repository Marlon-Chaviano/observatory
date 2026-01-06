/**
 * Design System Showcase
 *
 * This component demonstrates all the design system components
 * and their variants. Use this as a reference when building new components.
 */

"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/primitives/Alert";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/primitives/Card";

export function DesignSystemShowcase() {
	return (
		<div className="container mx-auto space-y-12 p-8">
			<section>
				<h1 className="mb-8 text-4xl font-bold">Design System Showcase</h1>
				<p className="text-muted-foreground">
					Ejemplos de todos los componentes del sistema de diseño con sus variantes.
				</p>
			</section>

			{/* Badge Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Badge Component</h2>
				<div className="flex flex-wrap gap-4">
					<Badge variant="default">Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="info">Info</Badge>
					<Badge variant="outline">Outline</Badge>
				</div>
				<div className="mt-4 flex flex-wrap gap-4">
					<Badge size="xs">Extra Small</Badge>
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
					<Badge size="lg">Large</Badge>
				</div>
				<div className="mt-4 flex flex-wrap gap-4">
					<Badge dot />
					<Badge variant="success" dot />
					<Badge variant="destructive" dot />
				</div>
			</section>

			{/* Button Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Button Component</h2>
				<div className="space-y-4">
					<div className="flex flex-wrap gap-4">
						<Button variant="default">Default</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
						<Button variant="warning">Warning</Button>
						<Button variant="success">Success</Button>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button size="xs">Extra Small</Button>
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
						<Button size="xl">Extra Large</Button>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button size="icon" aria-label="Icon button">
							<X className="h-4 w-4" />
						</Button>
						<Button size="icon-sm" aria-label="Small icon button">
							<X className="h-4 w-4" />
						</Button>
						<Button size="icon-lg" aria-label="Large icon button">
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button loading>Loading</Button>
						<Button disabled>Disabled</Button>
						<Button leftIcon={<CheckCircle2 className="h-4 w-4" />}>With Left Icon</Button>
						<Button rightIcon={<X className="h-4 w-4" />}>With Right Icon</Button>
						<Button fullWidth>Full Width</Button>
					</div>
				</div>
			</section>

			{/* Card Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Card Component</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card variant="default">
						<CardHeader>
							<CardTitle>Default Card</CardTitle>
							<CardDescription>Card with default styling</CardDescription>
						</CardHeader>
						<CardBody>
							<p>This is the default card variant with standard shadow.</p>
						</CardBody>
					</Card>

					<Card variant="elevated">
						<CardHeader>
							<CardTitle>Elevated Card</CardTitle>
							<CardDescription>Card with elevated shadow</CardDescription>
						</CardHeader>
						<CardBody>
							<p>This card has a more prominent shadow for emphasis.</p>
						</CardBody>
					</Card>

					<Card variant="outlined">
						<CardHeader>
							<CardTitle>Outlined Card</CardTitle>
							<CardDescription>Card with no shadow</CardDescription>
						</CardHeader>
						<CardBody>
							<p>This card has no shadow, only border.</p>
						</CardBody>
					</Card>

					<Card variant="interactive">
						<CardHeader>
							<CardTitle>Interactive Card</CardTitle>
							<CardDescription>Clickable card</CardDescription>
						</CardHeader>
						<CardBody>
							<p>This card has hover effects and is clickable.</p>
						</CardBody>
					</Card>

					<Card padding="none">
						<CardHeader>
							<CardTitle>No Padding</CardTitle>
						</CardHeader>
						<CardBody>
							<p>Card with custom padding (none).</p>
						</CardBody>
					</Card>

					<Card padding="sm">
						<CardHeader>
							<CardTitle>Small Padding</CardTitle>
						</CardHeader>
						<CardBody>
							<p>Card with small padding.</p>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Card with Footer</CardTitle>
							<CardDescription>Complete card structure</CardDescription>
						</CardHeader>
						<CardBody>
							<p>This card includes all sections: header, body, and footer.</p>
						</CardBody>
						<CardFooter>
							<Button size="sm">Action</Button>
						</CardFooter>
					</Card>
				</div>
			</section>

			{/* Alert Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Alert Component</h2>
				<div className="space-y-4">
					<Alert variant="default">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Default Alert</AlertTitle>
						<AlertDescription>
							This is a default alert message for general information.
						</AlertDescription>
					</Alert>

					<Alert variant="destructive">
						<X className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>Something went wrong. Please try again later.</AlertDescription>
					</Alert>

					<Alert variant="warning">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Warning</AlertTitle>
						<AlertDescription>
							This action cannot be undone. Please proceed with caution.
						</AlertDescription>
					</Alert>

					<Alert variant="success">
						<CheckCircle2 className="h-4 w-4" />
						<AlertTitle>Success</AlertTitle>
						<AlertDescription>Your changes have been saved successfully.</AlertDescription>
					</Alert>

					<Alert variant="info">
						<Info className="h-4 w-4" />
						<AlertTitle>Information</AlertTitle>
						<AlertDescription>Here is some useful information you should know.</AlertDescription>
					</Alert>
				</div>
			</section>

			{/* Typography Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Typography Scale</h2>
				<div className="space-y-4">
					<h1 className="text-4xl font-bold">Heading 1 (4xl)</h1>
					<h2 className="text-3xl font-bold">Heading 2 (3xl)</h2>
					<h3 className="text-2xl font-semibold">Heading 3 (2xl)</h3>
					<h4 className="text-xl font-semibold">Heading 4 (xl)</h4>
					<h5 className="text-lg font-medium">Heading 5 (lg)</h5>
					<h6 className="text-base font-medium">Heading 6 (base)</h6>
					<p className="text-base leading-relaxed">
						Body text (base) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is
						regular body text with relaxed line height for better readability.
					</p>
					<p className="text-sm">
						Small text (sm) - Used for captions, labels, and secondary information.
					</p>
					<p className="text-xs">Extra small text (xs) - Used for fine print and metadata.</p>
				</div>
			</section>

			{/* Color Examples */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Color Tokens</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-2">
						<div className="bg-primary text-primary-foreground flex h-20 items-center justify-center rounded-md font-medium">
							Primary
						</div>
						<p className="text-muted-foreground text-sm">primary / primary-foreground</p>
					</div>
					<div className="space-y-2">
						<div className="bg-secondary text-secondary-foreground flex h-20 items-center justify-center rounded-md font-medium">
							Secondary
						</div>
						<p className="text-muted-foreground text-sm">secondary / secondary-foreground</p>
					</div>
					<div className="space-y-2">
						<div className="bg-destructive text-destructive-foreground flex h-20 items-center justify-center rounded-md font-medium">
							Destructive
						</div>
						<p className="text-muted-foreground text-sm">destructive / destructive-foreground</p>
					</div>
					<div className="space-y-2">
						<div className="bg-muted text-muted-foreground flex h-20 items-center justify-center rounded-md font-medium">
							Muted
						</div>
						<p className="text-muted-foreground text-sm">muted / muted-foreground</p>
					</div>
				</div>
			</section>
		</div>
	);
}

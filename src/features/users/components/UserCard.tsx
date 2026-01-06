/**
 * UserCard Component
 *
 * Displays a single user item in a card format.
 * Server Component by default.
 *
 * @example
 * ```tsx
 * <UserCard user={user} />
 * ```
 */

import Image from "next/image";

import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";

import { getUserRoleDisplayName, getUserStatusDisplayName } from "../lib/userUtils";
import { User } from "../types";

interface UserCardProps {
	user: User;
}

export function UserCard({ user }: UserCardProps) {
	return (
		<Card>
			<div className="flex items-start gap-4">
				{/* Avatar */}
				{user.avatar ? (
					<Image
						src={user.avatar}
						alt={`${user.name} avatar`}
						width={48}
						height={48}
						className="h-12 w-12 rounded-full object-cover"
					/>
				) : (
					<div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
						<span className="text-muted-foreground text-lg font-semibold">
							{user.name.charAt(0).toUpperCase()}
						</span>
					</div>
				)}

				{/* User Info */}
				<div className="flex-1 space-y-2">
					<div>
						<h3 className="text-lg font-semibold">{user.name}</h3>
						<p className="text-muted-foreground text-sm">{user.email}</p>
					</div>

					{/* Badges */}
					<div className="flex gap-2">
						<Badge variant="outline">{getUserRoleDisplayName(user.role)}</Badge>
						<Badge variant={user.status === "active" ? "success" : "warning"}>
							{getUserStatusDisplayName(user.status)}
						</Badge>
					</div>
				</div>
			</div>
		</Card>
	);
}

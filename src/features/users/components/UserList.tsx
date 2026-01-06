/**
 * UserList Component
 *
 * Server Component that displays a list of users.
 * Fetches data on the server.
 */

import { userService } from "../lib/userService";

import { UserCard } from "./UserCard";

export async function UserList() {
	const users = await userService.getUsers();

	if (users.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-muted-foreground">No users found</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
}

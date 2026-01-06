/**
 * Users Feature
 *
 * Public API exports for users feature.
 */

// Components
export { UserCard } from "./components/UserCard";
export { UserForm } from "./components/UserForm";
export { UserList } from "./components/UserList";

// Hooks
export {
	useCreateUser,
	useDeleteUser,
	useUpdateUser,
	useUpdateUserPassword,
	useUser,
	useUsers,
} from "./hooks/useUsers";

// Types
export type {
	CreateUserDto,
	UpdateUserDto,
	UpdateUserPasswordDto,
	User,
	UserFilters,
} from "./types";
export { UserRole, UserStatus } from "./types";

// Schemas
export {
	type CreateUserInput,
	createUserSchema,
	type UpdateUserInput,
	type UpdateUserPasswordInput,
	updateUserPasswordSchema,
	updateUserSchema,
	type UserFiltersInput,
	userFiltersSchema,
} from "./schemas";

// Services (usually not exported, but available if needed)
export { userService } from "./lib/userService";

// Utils
export {
	applyUserFilters,
	getUserRoleDisplayName,
	getUserStatusDisplayName,
	hasAnyRole,
	hasRole,
	isUserActive,
	sortUsers,
} from "./lib/userUtils";

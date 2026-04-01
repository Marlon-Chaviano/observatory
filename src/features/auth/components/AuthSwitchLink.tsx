import Link from "next/link";

import { cn } from "@/lib/utils";

interface AuthSwitchLinkProps {
	disabled?: boolean;
	question: string;
	text_action: string;
	url: string;
}

export function AuthSwitchLink({ disabled, question, text_action, url }: AuthSwitchLinkProps) {
	return (
		<div className="border-border mt-8 border-t pt-6 text-center">
			<p className="text-muted-foreground text-sm">
				{question}{" "}
				<Link
					href={url}
					aria-disabled={disabled}
					onClick={(e) => {
						if (disabled) {
							e.preventDefault();
						}
					}}
					className={cn(
						disabled ? "pointer-events-none opacity-50" : "",
						"text-primary font-medium hover:underline"
					)}
				>
					{text_action}
				</Link>
			</p>
		</div>
	);
}

export const ErrorText = ({ message }: { message: string }) => {
	return (
		<div className="text-left">
			<p className="text-destructive">{message}</p>
		</div>
	);
};

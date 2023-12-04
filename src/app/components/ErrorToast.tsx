function ErrorToast({ message }: { message: string }) {
	return (
		<div className="toast toast-top toast-start">
			<div className="alert alert-error">
				<span>{message}</span>
			</div>
		</div>
	);
}

export default ErrorToast;

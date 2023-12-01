// hooks/useUser.ts

import { useState, useEffect } from "react";

interface UserData {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	user: {
		id: string;
		fullName: string;
		primaryEmailAddress: {
			emailAddress: string;
		};
	};
}

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch("/api/user");
				const data = await response.json();
				setUser(data.user);
			} catch (error) {
				console.error(error);
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	return user;
};

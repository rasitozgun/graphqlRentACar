import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<h1>Welcome Page</h1>
			<UserButton />
		</div>
	);
}

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Navbar() {
	return (
		<div className="flex items-center justify-between p-2 px-5 shadow-sm border-b-[1px]">
			<Image src="/logo.png" alt="logo" width={120} height={120} />
			<div className="hidden md:flex gap-5">
				<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
					Home
				</h2>
				<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
					Profile
				</h2>
				<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
					Settings
				</h2>
			</div>
			<UserButton />
		</div>
	);
}

export default Navbar;

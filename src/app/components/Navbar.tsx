"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
	const user = useUser();
	return (
		<div className="flex items-center justify-between p-2 px-5 shadow-sm border-b-[1px]">
			<Image
				src="/logo.png"
				alt="logo"
				width={120}
				height={120}
				className="w-auto h-auto"
				loading="eager"
				priority
			/>
			<div className="hidden md:flex gap-5">
				<Link href="/">
					<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
						Home
					</h2>
				</Link>
				<Link href={`/` + user?.user?.username}>
					<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
						Profile
					</h2>
				</Link>
				<h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">
					History
				</h2>
			</div>
			<UserButton />
		</div>
	);
}

export default Navbar;

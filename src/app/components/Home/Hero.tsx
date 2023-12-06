"use client";
import Image from "next/image";
import React from "react";

function Hero() {
	const handleClick = () => {
		const targetElement = document.getElementById("carsection");
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 py-12 md:px-20 px-10 ">
			<div>
				<h2 className="text-[40px] md:text-[60px] font-bold">
					Premium Car{" "}
					<span className="text-blue-600">Rental </span>
					in Your Area
				</h2>
				<h2 className="text-[20px] text-gray-900">
					Book the selected car effortlessly, Pay for driving
					only, Book the Car Now
				</h2>
				<button
					type="button"
					onClick={handleClick}
					className=" p-2 mt-5 bg-blue-500 text-white px-4 rounded-full hover:scale-105 transition-all"
				>
					Explore Cars
				</button>
			</div>
			<div>
				<Image
					src={"/hero.png"}
					width={400}
					height={500}
					alt="hero"
					className="w-full object-cover align-middle"
				/>
			</div>
		</div>
	);
}

export default Hero;

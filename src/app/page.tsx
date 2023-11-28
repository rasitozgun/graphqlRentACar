import CarsFilterOption from "./components/Home/CarsFilterOption";
import Hero from "./components/Home/Hero";
import SearchInput from "./components/Home/SearchInput";
import { useEffect } from "react";
import { getCarList } from "@/services/functions";

export default function Home() {
	return (
		<div className="p-5 sm:px-10 md:px-20">
			<Hero />
			<SearchInput />
			<CarsFilterOption />
		</div>
	);
}

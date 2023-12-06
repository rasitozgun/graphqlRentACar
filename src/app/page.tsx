import CarSection from "./components/Home/CarSection";
import Hero from "./components/Home/Hero";

export default function Home() {
	return (
		<div>
			<div className="bg-[#74f4ed]">
				<Hero />
			</div>
			<div className="py-5 px-20" id="carsection">
				<CarSection />
			</div>
		</div>
	);
}

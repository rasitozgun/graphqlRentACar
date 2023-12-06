import CarSection from "./components/Home/CarSection";
import Hero from "./components/Home/Hero";

export default function Home() {
	return (
		<div>
			<div className="bg-[#34dbd3]">
				<Hero />
			</div>
			<div className="py-5 px-20" id="carsection">
				<CarSection />
			</div>
		</div>
	);
}

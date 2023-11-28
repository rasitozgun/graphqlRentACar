import React from "react";
import SearchInput from "./SearchInput";
import CarsFilterOption from "./CarsFilterOption";
import CarList from "./CarList";

function CarSection() {
	return (
		<>
			<SearchInput />
			<CarsFilterOption />
			<CarList />
		</>
	);
}

export default CarSection;

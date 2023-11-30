import React from "react";
import SearchInput from "./SearchInput";
import CarsFilterOption from "./CarsFilterOption";
import CarList from "./CarList";
import { CarProvider } from "@/providers/CarContextProvider";
import Booking from "../CarBooking/BookingModal";

function CarSection() {
	return (
		<>
			<CarProvider>
				<SearchInput />
				<CarsFilterOption />
				<CarList />
			</CarProvider>
		</>
	);
}

export default CarSection;

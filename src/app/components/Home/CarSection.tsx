"use client";
import SearchInput from "./SearchInput";
import CarsFilterOption from "./CarsFilterOption";
import CarList from "./CarList";
import ErrorToast from "../ErrorToast";
import SuccessToast from "../SuccessToast";
import { useBookingToastContext } from "@/context/BookingToastContext";

function CarSection() {
	const { message, show, type } = useBookingToastContext();

	return (
		<>
			<SearchInput />
			<CarsFilterOption />
			<CarList />
			{show && type === "error" && <ErrorToast message={message} />}
			{show && type === "success" && (
				<SuccessToast message={message} />
			)}
		</>
	);
}

export default CarSection;

"use client";
import { useQuery } from "@apollo/client";
import { GET_CAR_LIST } from "@/services/queries";
import CarCards from "./CarCards";
import { useCarContext } from "@/context/CarContext";
import { useEffect } from "react";
import { Car } from "@/types/Types";
import BookingModal from "../CarBooking/BookingModal";
import CardSkeleton from "../Skeletons/CardSkeleton";

function CarList() {
	const { state, dispatch } = useCarContext();
	const { data, loading, error } = useQuery(GET_CAR_LIST);

	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_CAR_LIST", payload: data.carLists });
		}
	}, [data, dispatch]);

	const openModal = async (car: Car) => {
		dispatch({ type: "SET_SELECTED_CAR", payload: car });
	};

	useEffect(() => {
		if (state.selectedCar) {
			(window as any).car_modal.showModal();
		}
	}, [state.selectedCar]);

	return (
		<div>
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
					{[...Array(4)].map((_, i) => (
						<CardSkeleton key={i} />
					))}
				</div>
			)}
			{error && <div>{error.message}</div>}
			{state && (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
					{state.filteredCarList.map((car: Car) => (
						<div onClick={() => openModal(car)} key={car.id}>
							<CarCards car={car} />
						</div>
					))}
				</div>
			)}
			{state.selectedCar && (
				<dialog id="car_modal" className="modal">
					<BookingModal car={state.selectedCar} />
				</dialog>
			)}
		</div>
	);
}

export default CarList;

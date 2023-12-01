"use client";
import { useQuery } from "@apollo/client";
import { GET_CAR_LIST } from "@/services/queries";
import CarCards from "./CarCards";
import { useCarContext } from "@/providers/CarContextProvider";
import { useEffect, useState } from "react";
import { Car } from "@/types/Types";
import BookingModal from "../CarBooking/BookingModal";
import Loading from "../Loading";

function CarList() {
	const { state, dispatch } = useCarContext();
	const { data, loading, error } = useQuery(GET_CAR_LIST);
	const [selectedCar, setSelectedCar] = useState<Car | null>(null);

	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_CAR_LIST", payload: data.carLists });
		}
	}, [data, dispatch]);

	const openModal = async (car: Car) => {
		setSelectedCar(car);
	};

	useEffect(() => {
		if (selectedCar) {
			(window as any).car_modal.showModal();
		}
	}, [selectedCar]);

	return (
		<>
			{loading && <Loading />}
			{error && <div>{error.message}</div>}
			{state && (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{state.filteredCarList.map((car: Car) => (
						<div onClick={() => openModal(car)} key={car.id}>
							<CarCards car={car} />
						</div>
					))}
				</div>
			)}
			{selectedCar && (
				<dialog id="car_modal" className="modal">
					<BookingModal car={selectedCar} />
				</dialog>
			)}
		</>
	);
}

export default CarList;

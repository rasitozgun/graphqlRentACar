"use client";
import { useQuery } from "@apollo/client";
import { GET_CAR_LIST } from "@/services/queries";
import CarCards from "./CarCards";
import { useCarContext } from "@/providers/CarContextProvider";
import { useEffect, useState } from "react";
import { Car } from "@/types/Types";
import BookingModal from "../CarBooking/BookingModal";

function CarList() {
	const { state, dispatch } = useCarContext();
	const { data, loading, error } = useQuery(GET_CAR_LIST);
	const [selectedCar, setSelectedCar] = useState<Car | null>(null);
	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_CAR_LIST", payload: data.carLists });
		}
	}, [data, dispatch]);

	const openModal = (car: Car) => {
		setSelectedCar(car);
		(window as any).car_modal.showModal();
	};

	useEffect(() => {
		console.log("Modal Rendered with car:", selectedCar);
	}, [selectedCar]);

	return (
		<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
			{loading && <span className="loader">Loading</span>}
			{error && <div>{error.message}</div>}
			{state &&
				state.filteredCarList.map((car: Car) => (
					<div
						className="group min-h-[341px] bg-gray-50 p-2 sm:p-5 rounded-3xl m-1 sm:m-5 hover:bg-white  hover:border-[1px] cursor-pointer duration-50 border-blue-500"
						onClick={() => openModal(car)}
						key={car.id}
					>
						<CarCards car={car} />
					</div>
				))}

			{selectedCar && (
				<dialog id="car_modal" className="modal">
					<BookingModal car={selectedCar} />
				</dialog>
			)}
		</div>
	);
}

export default CarList;

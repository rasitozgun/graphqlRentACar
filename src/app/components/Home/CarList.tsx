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
	const [modalLoading, setModalLoading] = useState<boolean>(false);

	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_CAR_LIST", payload: data.carLists });
		}
	}, [data, dispatch]);

	const openModal = async (car: Car) => {
		setSelectedCar(car);
		setModalLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 500)); // Örnek olarak 500ms bekleyin, süreyi ihtiyacınıza göre ayarlayabilirsiniz.

		setModalLoading(false);

		if (
			(window as any).car_modal &&
			typeof (window as any).car_modal.showModal === "function"
		) {
			(window as any).car_modal.showModal();
		} else {
			console.error(
				"Modal element not found or showModal function is not defined.",
			);
		}
	};

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{loading && <span className="loader">Loading</span>}
				{error && <div>{error.message}</div>}
				{state &&
					state.filteredCarList.map((car: Car) => (
						<div onClick={() => openModal(car)} key={car.id}>
							<CarCards car={car} />
						</div>
					))}
			</div>
			{selectedCar && (
				<dialog id="car_modal" className="modal">
					{modalLoading ? (
						<span>Loading...</span>
					) : (
						<BookingModal car={selectedCar} />
					)}
				</dialog>
			)}
		</>
	);
}

export default CarList;

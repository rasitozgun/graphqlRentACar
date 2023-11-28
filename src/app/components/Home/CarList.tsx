"use client";
import { useQuery } from "@apollo/client";
import { GET_CAR_LIST } from "@/services/queries";
import CarCards from "./CarCards";
import { useCarContext } from "@/providers/CarContextProvider";
import { useEffect } from "react";

function CarList() {
	const { state, dispatch } = useCarContext();
	const { data, loading, error } = useQuery(GET_CAR_LIST);

	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_CAR_LIST", payload: data.carLists });
		}
	}, [data, dispatch]);

	return (
		<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{state &&
				state.filteredCarList.map((car) => (
					<CarCards car={car} key={car.id} />
				))}
		</div>
	);
}

export default CarList;

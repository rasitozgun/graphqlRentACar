"use client";
import { useQuery } from "@apollo/client";
import { GET_CAR_LIST } from "@/services/queries";

function CarList() {
	const { data, loading, error } = useQuery(GET_CAR_LIST);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;
	console.log(data);
	return <div>CarList</div>;
}

export default CarList;

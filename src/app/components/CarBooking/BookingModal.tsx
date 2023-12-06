import { Car, StoreLocation } from "@/types/Types";
import CarCards from "../Home/CarCards";
import Form from "./Form";
import { useQuery } from "@apollo/client";
import { GET_STORE_LOCATIONS } from "@/services/queries";
import { useEffect, useState } from "react";
import CardSkeleton from "../Skeletons/CardSkeleton";

function BookingModal({ car }: { car: Car }) {
	const { data, loading, error } = useQuery(GET_STORE_LOCATIONS);
	const [storeLocation, setStoreLocation] = useState<
		StoreLocation[] | null
	>(null);

	useEffect(() => {
		if (data) {
			setStoreLocation(data.storeLocations);
		}
	}, [data]);

	return (
		<div className="modal-box w-11/12 max-w-5xl">
			<div className="border-b-[1px] pb-2 ">
				<h3 className=" text-[30px] font-light text-gray-400">
					Rent A Car Now!
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 p-5">
				<div>
					{loading && <CardSkeleton />}
					{!loading && !error && storeLocation && (
						<CarCards car={car} />
					)}
				</div>
				<div>
					{loading && <CardSkeleton />}
					{error && <div>{error.message}</div>}
					{!loading && !error && storeLocation && (
						<Form storeLocation={storeLocation} car={car} />
					)}
				</div>
			</div>
		</div>
	);
}

export default BookingModal;

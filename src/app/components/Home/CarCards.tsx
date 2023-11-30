import Image from "next/image";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import { Car } from "@/types/Types";
import { GET_STORE_LOCATIONS } from "@/services/queries";
import { useQuery } from "@apollo/client";

function CarCards({ car }: { car: Car }) {
	const { data, loading, error } = useQuery(GET_STORE_LOCATIONS);
	console.log(data);

	return (
		<>
			<h2 className="text-[20px] font-medium mb-2">{car.name}</h2>
			<h2 className="text-[28px] font-bold mb-2">
				<span className="text-[12px] font-light">$</span>{" "}
				{car.price}
				<span className="text-[12px] font-light"> /day</span>
			</h2>
			<div className="flex justify-center">
				{car.image && car.image.url ? (
					<Image
						src={car.image.url}
						width={220}
						height={200}
						className="w-[250px] h-[150px] mb-3 object-contain"
						alt={car.name}
					/>
				) : (
					<span>Image not available</span>
				)}
			</div>
			<div className="flex justify-around ">
				<div className="text-center text-gray-500">
					<PiSteeringWheelFill className="w-full text-[22px] mb-2" />
					<h2 className="line-clamp-5 text-[14px] font-light">
						{car.carType}
					</h2>
				</div>
				<div className="text-center text-gray-500">
					<MdAirlineSeatReclineNormal className="w-full text-[22px] mb-2" />
					<h2 className="line-clamp-5 text-[14px] font-light">
						{car.seat}
					</h2>
				</div>
				<div className="text-center text-gray-500">
					<FaGasPump className="w-full text-[22px] mb-2" />
					<h2 className="line-clamp-5 text-[14px] font-light">
						{car.carAvg} MPG
					</h2>
				</div>
			</div>
		</>
	);
}

export default CarCards;

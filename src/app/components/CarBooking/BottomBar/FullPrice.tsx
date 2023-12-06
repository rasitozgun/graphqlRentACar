import { calculateDaysDifference } from "@/functions/functions";
import { Car, FormData } from "@/types/Types";
import React from "react";

type Props = {
	car: Car;
	formData: FormData;
};

const FullPrice = ({ formData, car }: Props) => {
	return (
		<div>
			{formData.pickUpDateTime !== "" &&
				formData.dropOffDateTime !== "" && (
					<p className="text-gray-400">
						Total Price:{" "}
						<span className="text-gray-600">
							{car.price *
								calculateDaysDifference(
									formData.pickUpDateTime,
									formData.dropOffDateTime,
								)}{" "}
							$
						</span>
					</p>
				)}
		</div>
	);
};

export default FullPrice;

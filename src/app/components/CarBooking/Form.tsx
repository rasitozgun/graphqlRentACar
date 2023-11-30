import React from "react";
import { StoreLocation } from "@/types/Types";
function Form({ storeLocation }: { storeLocation: StoreLocation[] }) {
	return (
		<div>
			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">PickUp Location</label>
				<select
					className="select  select-bordered w-full max-w-lg"
					name="location"
				>
					<option disabled defaultChecked>
						PickUp Location?
					</option>
					{storeLocation &&
						storeLocation.map((location: StoreLocation) => (
							<option key={location.id} value={location.id}>
								{location.adress}
							</option>
						))}
				</select>
			</div>
			<div className="flex flec-col gap-5 mb-5">
				<div className="flex flex-col w-full">
					<label className="text-gray-400">Pick Up Date</label>
					<input
						type="date"
						min="Thu Nov 30 2023 16:27:34 GMT+0300 (GMT+03:00)"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="pickUpDate"
					/>
				</div>
				<div className="flex flex-col w-full">
					<label className="text-gray-400">Drop Off Date</label>
					<input
						type="date"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="dropOffDate"
					/>
				</div>
			</div>
			<div className="flex gap-5 ">
				<div className="flex flex-col w-full mb-5">
					<label className="text-gray-400">Pick Up Time</label>
					<input
						type="time"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="pickUpTime"
					/>
				</div>
				<div className="flex flex-col w-full mb-5">
					<label className="text-gray-400">Drop Off Time</label>
					<input
						type="time"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="dropOffTime"
					/>
				</div>
			</div>
			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">Contact Number</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-lg"
					name="contactNumber"
				/>
			</div>
		</div>
	);
}

export default Form;

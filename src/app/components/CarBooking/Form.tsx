import { useEffect, useState } from "react";
import { Car, StoreLocation, FormData } from "@/types/Types";
import { useUser } from "@clerk/nextjs";
import { CREATE_BOOKING, PUBLISH_BOOKING } from "@/services/queries";
import { useMutation } from "@apollo/client";

function Form({
	storeLocation,
	car,
}: {
	storeLocation: StoreLocation[];
	car: Car;
}) {
	const user = useUser();
	const [formData, setFormData] = useState<FormData>({
		location: "",
		pickUpDate: "",
		dropOffDate: "",
		pickUpTime: "",
		dropOffTime: "",
		contactNumber: "",
		username: "",
		email: "",
		carId: { connect: { id: "" } },
	});

	const today: Date = new Date();

	useEffect(() => {
		if (car) {
			console.log(user);

			setFormData((prevData) => ({
				...prevData,
				username: user?.user?.fullName || "",
				email: user?.user?.primaryEmailAddress?.emailAddress || "",
				carId: { connect: { id: car.id.toString() } },
			}));
		}
	}, [car]);

	const handleChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [createBooking, { data, error }] = useMutation(CREATE_BOOKING);
	const [publishBooking] = useMutation(PUBLISH_BOOKING);

	const handleSubmit = async (formData: FormData) => {
		await createBooking({
			variables: { data: formData },
		});

		if (data) {
			console.log("Booking created successfully!");
			publishBooking({
				variables: { id: data.createBooking.id },
			});
			(window as any).car_modal.close();
		}

		if (error) {
			console.log(error);
		}
	};

	const handleFormSubmit = (
		e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
	) => {
		e.preventDefault();
		console.log(formData);
		handleSubmit(formData);
	};

	return (
		<div>
			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">Pick Up Location</label>
				<select
					className="select  select-bordered w-full max-w-lg"
					name="location"
					onChange={handleChange}
				>
					<option disabled value="" hidden selected>
						Pick up location?
					</option>
					{storeLocation &&
						storeLocation.map((location: StoreLocation) => (
							<option key={location.id}>
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
						min={today.toISOString().split("T")[0]}
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="pickUpDate"
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col w-full">
					<label className="text-gray-400">Drop Off Date</label>
					<input
						type="date"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="dropOffDate"
						onChange={handleChange}
						disabled={formData.pickUpDate === ""}
						min={(formData.pickUpDate as string).split("T")[0]}
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
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col w-full mb-5">
					<label className="text-gray-400">Drop Off Time</label>
					<input
						type="time"
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="dropOffTime"
						onChange={handleChange}
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
					onChange={handleChange}
				/>
			</div>
			<div className="modal-action">
				<button className="btn">Close</button>
				<button
					onClick={handleFormSubmit}
					className="btn bg-blue-500 text-white hover:bg-blue-800"
				>
					Save
				</button>
			</div>
		</div>
	);
}

export default Form;

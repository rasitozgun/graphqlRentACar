import { useEffect, useState } from "react";
import { Car, StoreLocation, FormData } from "@/types/Types";
import { useUser } from "@clerk/nextjs";
import { CREATE_BOOKING, PUBLISH_BOOKING } from "@/services/queries";
import { useMutation } from "@apollo/client";
import { useCarContext } from "@/context/CarContext";
import { useBookingToastContext } from "@/context/BookingToastContext";

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
		pickUpDateTime: "",
		dropOffDateTime: "",
		contactNumber: "",
		username: "",
		email: "",
		carId: { connect: { id: "" } },
	});

	const { dispatch } = useCarContext();
	const { updateToast } = useBookingToastContext();

	const today: Date = new Date();

	useEffect(() => {
		if (car) {
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
		if (
			e.target.name === "pickUpDateTime" ||
			e.target.name === "dropOffDateTime"
		) {
			const dateObject = new Date(e.target.value);

			setFormData({
				...formData,
				[e.target.name]: dateObject.toISOString(),
			});
		} else if (e.target.name === "contactNumber") {
			const inputValue: string = e.target.value.replace(/\D/g, "");

			const formattedPhoneNumber: string =
				formatPhoneNumber(inputValue);

			console.log(formattedPhoneNumber);
			setFormData({
				...formData,
				[e.target.name]: formattedPhoneNumber,
			});
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const formatPhoneNumber = (input: string) => {
		const phoneRegex =
			/^\+905(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})[-\s]?(\d{2})$/;
		const match = input.match(phoneRegex);

		if (match) {
			return `+905${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
		} else {
			return input;
		}
	};

	const addZero = (num: number) => {
		return num < 10 ? `0${num}` : num;
	};

	const [createBooking, { data, error }] = useMutation(CREATE_BOOKING);
	const [publishBooking] = useMutation(PUBLISH_BOOKING);

	useEffect(() => {
		if (data) {
			console.log("Booking created successfully!");
			publishBooking({
				variables: { id: data.createBooking.id },
			});
			(window as any).car_modal.close();
			updateToast("Booking created successfully!", "success", true);
		}

		if (error) {
			console.log(error);
			updateToast("Something went wrong!", "error", true);
		}
	}, [data, error]);

	const handleSubmit = async (formData: FormData) => {
		console.log(formData);

		await createBooking({
			variables: { data: formData },
		});
	};

	const handleFormSubmit = (
		e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
	) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	const handleClose = () => {
		dispatch({ type: "SET_SELECTED_CAR", payload: null });
		(window as any).car_modal.close();
	};

	return (
		<div>
			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">Pick Up Location</label>
				<select
					className="select  select-bordered w-full max-w-lg"
					name="location"
					onChange={handleChange}
					required
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
			<div className="flex flex-col gap-5 mb-5">
				<div className="flex flex-col w-full">
					<label className="text-gray-400">Pick Up Date</label>
					<input
						type="datetime-local"
						min={`${today.getFullYear()}-${addZero(
							today.getMonth() + 1,
						)}-${addZero(today.getDate())}T${addZero(
							today.getHours(),
						)}:${addZero(today.getMinutes())}`}
						placeholder="Type here"
						className="input input-bordered w-full max-w-lg"
						name="pickUpDateTime"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="flex flex-col w-full">
					<label className="text-gray-400">Drop Off Date</label>
					<input
						type="datetime-local"
						placeholder="Type here"
						className="input input-bordered max-w-lg"
						name="dropOffDateTime"
						onChange={handleChange}
						disabled={formData.pickUpDateTime === ""}
						min={formData.pickUpDateTime}
						required
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
					value={formData.contactNumber}
					onChange={handleChange}
					required
				/>
			</div>
			<div className="flex justify-between">
				<button className="btn" onClick={handleClose}>
					Close
				</button>
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

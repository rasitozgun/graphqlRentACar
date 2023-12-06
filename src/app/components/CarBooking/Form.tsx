import { useUser } from "@clerk/nextjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Car, StoreLocation, FormData } from "@/types/Types";
import { CREATE_BOOKING, PUBLISH_BOOKING } from "@/services/queries";
import { useBookingToastContext } from "@/context/BookingToastContext";
import { formatPhoneNumber, addZero } from "@/functions/functions";
import ButtonGroup from "./BottomBar/ButtonGroup";
import FullPrice from "./BottomBar/FullPrice";
import { useCarContext } from "@/context/CarContext";

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
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (car) {
			setFormData((prevData) => ({
				...prevData,
				username: user?.user?.username || "",
				email: user?.user?.primaryEmailAddress?.emailAddress || "",
				carId: { connect: { id: car.id.toString() } },
			}));
		}
	}, [car]);

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
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
			const target = e.target as HTMLInputElement;
			if (target instanceof HTMLInputElement) {
				const { value, selectionStart, selectionEnd } = target;
				const formattedPhoneNumber = formatPhoneNumber(value);

				setFormData({
					...formData,
					[e.target.name]: formattedPhoneNumber,
				});

				if (inputRef.current) {
					if (selectionStart !== null && selectionEnd !== null) {
						const position =
							formattedPhoneNumber.indexOf(
								value[selectionStart - 1],
								selectionEnd - 1,
							) + 1 || selectionEnd;

						inputRef.current.setSelectionRange(
							position,
							position,
						);
					}
				}
			}
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const [createBooking, { data, error }] = useMutation(CREATE_BOOKING);
	const [publishBooking] = useMutation(PUBLISH_BOOKING);

	useEffect(() => {
		if (data) {
			publishBooking({
				variables: { id: data.createBooking.id },
			});
			(window as any).car_modal.close();
			dispatch({ type: "SET_SELECTED_CAR", payload: null });
			updateToast("Booking created successfully!", "success", true);
		}

		if (error) {
			console.log(error);
			updateToast("Something went wrong!", "error", true);
		}
	}, [data, error]);

	const today: Date = new Date();

	return (
		<div>
			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">Pick Up Location</label>
				<select
					className="select  select-bordered w-full max-w-lg"
					name="location"
					onChange={handleChange}
					required
					defaultValue={"pickup"}
				>
					<option disabled value="pickup" hidden>
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
						min={`${formData.pickUpDateTime.slice(
							0,
							10,
						)}T${formData.pickUpDateTime.slice(11, 16)}`}
						required
					/>
				</div>
			</div>

			<div className="flex flex-col w-full mb-5">
				<label className="text-gray-400">Contact Number</label>
				<input
					type="tel"
					placeholder="Type here"
					className="input input-bordered w-full max-w-lg"
					name="contactNumber"
					value={formData.contactNumber}
					onChange={handleChange}
					required
					ref={inputRef}
				/>
			</div>
			<div className="flex justify-between">
				<FullPrice car={car} formData={formData} />
				<ButtonGroup
					formData={formData}
					createBooking={createBooking}
					dispatch={dispatch}
				/>
			</div>
		</div>
	);
}

export default Form;

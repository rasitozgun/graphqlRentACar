import { Car } from "@/types/Types";
import CarCards from "../Home/CarCards";
import Form from "./Form";

function BookingModal({ car }: { car: Car }) {
	return (
		<form className="modal-box w-11/12 max-w-5xl" method="dialog">
			<div className="border-b-[1px] pb-2 ">
				<h3 className=" text-[30px] font-light text-gray-400">
					Rent A Car Now!
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 p-5">
				<div>
					<CarCards car={car} />
				</div>
				<div>
					<Form />
				</div>
			</div>
			<div className="modal-action">
				<button className="btn">Close</button>
				<button className="btn bg-blue-500 text-white hover:bg-blue-800">
					Save
				</button>
			</div>
		</form>
	);
}

export default BookingModal;

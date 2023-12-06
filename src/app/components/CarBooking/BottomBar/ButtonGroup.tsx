import { FormData } from "@/types/Types";
import {
	ApolloCache,
	DefaultContext,
	MutationFunctionOptions,
	OperationVariables,
} from "@apollo/client";
import { Dispatch } from "react";

type Props = {
	formData: FormData;
	createBooking: (
		options?:
			| MutationFunctionOptions<
					any,
					OperationVariables,
					DefaultContext,
					ApolloCache<any>
			  >
			| undefined,
	) => Promise<any>;
	dispatch: Dispatch<any>;
};

function ButtonGroup({ formData, createBooking, dispatch }: Props) {
	const handleSubmit = async (formData: FormData) => {
		await createBooking({
			variables: {
				data: {
					...formData,
					contactNumber: `+90${formData.contactNumber}`,
				},
			},
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
			<button className="btn mr-4" onClick={handleClose}>
				Close
			</button>
			<button
				onClick={handleFormSubmit}
				className="btn bg-blue-500 text-white hover:bg-blue-800"
			>
				Save
			</button>
		</div>
	);
}

export default ButtonGroup;

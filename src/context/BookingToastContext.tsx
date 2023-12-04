"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type ToastType = "error" | "success" | "info";

interface BookingToastContextProps {
	message: string;
	type: ToastType;
	show: boolean;
	updateToast: (
		message: string,
		type: "error" | "success" | "info",
		show: boolean,
	) => void;
}

export const BookingToastContext = createContext<BookingToastContextProps>(
	{
		message: "",
		type: "info",
		show: false,
		updateToast: () => {},
	},
);

export const BookingToastProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [message, setMessage] = useState("");
	const [type, setType] = useState<ToastType>("info");
	const [show, setShow] = useState(false);

	const updateToast = (message: string, type: ToastType) => {
		setMessage(message);
		setType(type as "error" | "success" | "info");
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 3000);
	};

	return (
		<BookingToastContext.Provider
			value={{ message, type, show, updateToast }}
		>
			{children}
		</BookingToastContext.Provider>
	);
};

export const useBookingToastContext = () => {
	const context = useContext(BookingToastContext);
	if (context === undefined) {
		throw new Error(
			"useBookingToastContext must be used within a BookingToastProvider",
		);
	}
	return context;
};

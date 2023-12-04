"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { Car, State } from "@/types/Types";

interface CarProviderProps {
	children: ReactNode;
}
interface CarContextProps {
	state: State;
	dispatch: React.Dispatch<Action>;
}

type Action =
	| { type: "SET_CAR_LIST"; payload: Car[] }
	| { type: "SET_SELECTED_BRAND"; payload: string }
	| { type: "SET_PRICE_FILTER"; payload: string }
	| { type: "FILTER_CARS" }
	| { type: "SET_SELECTED_CAR"; payload: Car | null };

const CarContext = createContext<CarContextProps | undefined>(undefined);

const initialState: State = {
	carList: [],
	filteredCarList: [],
	selectedBrand: null,
	priceFilter: null,
	selectedCar: null,
};

const carReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_CAR_LIST":
			return {
				...state,
				carList: action.payload,
				filteredCarList: action.payload,
			};
		case "SET_SELECTED_BRAND":
			return {
				...state,
				selectedBrand: action.payload,
			};
		case "SET_PRICE_FILTER":
			return {
				...state,
				priceFilter: action.payload,
				filteredCarList: filterCars(action.payload, state.carList),
			};
		case "SET_SELECTED_CAR":
			return {
				...state,
				selectedCar: action.payload,
			};
		default:
			return state;
	}
};

const filterCars = (priceFilter: string | null, carList: Car[]): Car[] => {
	let filteredList = [...carList];

	if (priceFilter === "mintomax") {
		filteredList = filteredList.sort((a, b) => a.price - b.price);
	} else if (priceFilter === "maxtomin") {
		filteredList = filteredList.sort((a, b) => b.price - a.price);
	}

	return filteredList;
};

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(carReducer, initialState);

	return (
		<CarContext.Provider value={{ state, dispatch }}>
			{children}
		</CarContext.Provider>
	);
};

export const useCarContext = () => {
	const context = useContext(CarContext);
	if (!context) {
		throw new Error("useCarContext must be used within a CarProvider");
	}
	return context;
};

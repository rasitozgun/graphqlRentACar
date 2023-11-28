"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { Car, Action, State } from "@/types/Types";

interface CarProviderProps {
	children: ReactNode;
}

const CarContext = createContext<
	{ state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const initialState: State = {
	carList: [],
	filteredCarList: [],
	selectedBrand: null,
	priceFilter: null,
};

interface CarContextProps {
	state: State;
	dispatch: React.Dispatch<Action>;
}

const carReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_CAR_LIST":
			return {
				...state,
				carList: action.payload,
				filteredCarList: action.payload,
			};
		case "SET_SELECTED_BRAND":
			return { ...state, selectedBrand: action.payload };
		case "SET_PRICE_FILTER":
			return { ...state, priceFilter: action.payload };
		case "FILTER_CARS":
			// Filtreleme işlemleri burada yapılacak
			return state;
		default:
			return state;
	}
};

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(carReducer, initialState);

	return (
		<CarContext.Provider value={{ state, dispatch }}>
			{children}
		</CarContext.Provider>
	);
};

export const useCarContext = (): CarContextProps => {
	const context = useContext(CarContext);
	if (!context) {
		throw new Error("useCarContext must be used within a CarProvider");
	}
	return context;
};

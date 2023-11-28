export type Brand = {
	carBrand: string;
};

export type Car = {
	id: number;
	carAvg: number;
	createdAt: string;
	name: string;
	price: number;
	carBrand: string;
	carType: string;
	seat: number;
	image: {
		url: string;
	};
};

export type State = {
	carList: Car[];
	filteredCarList: Car[];
	selectedBrand: string | null;
	priceFilter: string | null;
};

export type Action =
	| { type: "SET_CAR_LIST"; payload: Car[] }
	| { type: "SET_SELECTED_BRAND"; payload: string }
	| { type: "SET_PRICE_FILTER"; payload: string }
	| { type: "FILTER_CARS" };

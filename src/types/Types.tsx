export type Brand = {
	carBrand: string;
};

export type FormData = {
	location: string;
	pickUpDate: string;
	dropOffDate: string;
	pickUpTime: string;
	dropOffTime: string;
	contactNumber: string;
	username: string;
	email: string;
	carId: { connect: { id: string } };
};

export type StoreLocation = {
	id: string;
	adress: string;
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
	selectedCar: Car | null;
};

export type Action =
	| { type: "SET_CAR_LIST"; payload: Car[] }
	| { type: "SET_SELECTED_BRAND"; payload: string }
	| { type: "SET_PRICE_FILTER"; payload: string }
	| { type: "FILTER_CARS" }
	| { type: "SET_SELECTED_CAR"; payload: Car | null };

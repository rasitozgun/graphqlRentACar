export type Brand = {
	carBrand: string;
};

export type FormData = {
	location: string;
	pickUpDateTime: string;
	dropOffDateTime: string;
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

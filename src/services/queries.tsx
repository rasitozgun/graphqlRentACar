import { gql } from "@apollo/client";

export const GET_CAR_LIST = gql`
	query CarLists {
		carLists {
			id
			carAvg
			name
			price
			carBrand
			carType
			seat
			image {
				url
			}
		}
	}
`;

export const GET_CAR_BRANDS = gql`
	query CarBrands {
		carLists {
			carBrand
		}
	}
`;

export const GET_CAR_BY_BRAND = gql`
	query CarLists($brand: CarBrand!) {
		carLists(where: { carBrand: $brand }) {
			carAvg
			createdAt
			id
			name
			price
			publishedAt
			updatedAt
			carBrand
			carType
			seat
			image {
				url
			}
		}
	}
`;

export const GET_STORE_LOCATIONS = gql`
	query StoreLocations {
		storeLocations {
			id
			adress
		}
	}
`;

export const CREATE_BOOKING = gql`
	mutation CreateBooking($data: BookingCreateInput!) {
		createBooking(data: $data) {
			id
			pickUpDate
			dropOffDate
			username
			email
			contactNumber
			pickUpTime
			dropOffTime
			location
			carId {
				id
			}
		}
	}
`;

export const PUBLISH_BOOKING = gql`
	mutation PublishBooking($id: ID!) {
		publishBooking(where: { id: $id }) {
			id
		}
	}
`;

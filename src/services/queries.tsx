import { gql } from "@apollo/client";

export const GET_CAR_LIST = gql`
	query CarLists {
		carLists {
			carAvg
			createdAt
			id
			name
			price
			publishedAt
			updatedAt
		}
	}
`;

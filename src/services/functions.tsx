import { GET_CAR_LIST } from "./queries";
import { client } from "./index";

export const getCarList = async () => {
	const result = await client.query({ query: GET_CAR_LIST });
	return result;
};

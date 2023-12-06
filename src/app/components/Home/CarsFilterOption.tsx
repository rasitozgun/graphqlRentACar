"use client";
import { useCarContext } from "@/context/CarContext";
import { client } from "@/services";
import {
	GET_CAR_BRANDS,
	GET_CAR_BY_BRAND,
	GET_CAR_LIST,
} from "@/services/queries";
import { Brand } from "@/types/Types";
import { useQuery } from "@apollo/client";

function CarsFilterOption() {
	const { data: brandList } = useQuery(GET_CAR_BRANDS);
	const { dispatch } = useCarContext();

	const brands = Array.from(
		new Set(
			brandList?.carLists.map((brand: Brand) => brand.carBrand),
		) || [],
	).map((carBrand) => ({
		carBrand: carBrand as string,
	}));

	const handleBrandChange = async (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const selectedBrand = e.target.value;

		try {
			const { data } = await client.query({
				query:
					selectedBrand === "all"
						? GET_CAR_LIST
						: GET_CAR_BY_BRAND,
				variables: { brand: selectedBrand },
			});

			dispatch({
				type: "SET_CAR_LIST",
				payload: data.carLists,
			});

			dispatch({
				type: "SET_SELECTED_BRAND",
				payload: selectedBrand,
			});
		} catch (error) {
			console.error("Error fetching car data by brand:", error);
		}
	};

	const handlePriceFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		dispatch({ type: "SET_PRICE_FILTER", payload: e.target.value });
	};

	return (
		<div className="mt-4 flex items-center justify-between">
			<div>
				<h2 className="text-[30px] font-bold">Cars Catalog</h2>
				<h2>Explore cars you might like</h2>
			</div>
			<div className="flex gap-5">
				<div>
					<label htmlFor="price" className="text-gray-500">
						Sort by
					</label>
					<select
						className="select select-bordered w-full max-w-xs"
						onChange={handlePriceFilterChange}
						defaultValue={"price"}
						name="price"
						id="price"
					>
						<option disabled value="price" hidden>
							Price
						</option>
						<option value={"mintomax"}>Min to Max</option>
						<option value={"maxtomin"}>Max to Min</option>
					</select>
				</div>
				<div>
					<label htmlFor="brand" className="text-gray-500">
						Filter by
					</label>
					<select
						className="select select-bordered w-full md:block max-w-xs hidden"
						onChange={handleBrandChange}
						name="brand"
						id="brand"
						defaultValue={"manufacturer"}
					>
						<option disabled value="manufacturer" hidden>
							Brand
						</option>
						<option value={"all"}>All</option>
						{brands.map((brand: Brand, index: number) => (
							<option
								className="my-5 py-5"
								key={index}
								value={brand.carBrand}
							>
								{brand.carBrand}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}

export default CarsFilterOption;

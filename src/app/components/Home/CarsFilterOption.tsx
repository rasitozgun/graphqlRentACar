"use client";
import { useCarContext } from "@/providers/CarContextProvider";
import { GET_CAR_BRANDS, GET_CAR_BY_BRAND } from "@/services/queries";
import { Brand } from "@/types/Types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function CarsFilterOption() {
	const [selectedBrand, setSelectedBrand] = useState<string | null>(
		null,
	);

	const { data } = useQuery(GET_CAR_BRANDS);
	const brands = Array.from(
		new Set(data?.carLists.map((brand: Brand) => brand.carBrand)),
	).map((carBrand) => {
		return {
			carBrand: carBrand as string,
		};
	});

	const { state, dispatch } = useCarContext();

	const [getCarByBrand, { loading: carLoading, data: carData }] =
		useLazyQuery(GET_CAR_BY_BRAND);

	const handleBrandChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const selectedBrand = e.target.value;
		setSelectedBrand(selectedBrand);
		dispatch({ type: "SET_SELECTED_BRAND", payload: selectedBrand });
	};

	useEffect(() => {
		if (selectedBrand) {
			getCarByBrand({
				variables: { brand: selectedBrand },
			});
			console.log(carData);
		}
	}, [selectedBrand, getCarByBrand]);

	const handlePriceFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		dispatch({ type: "SET_PRICE_FILTER", payload: e.target.value });
		// Apollo Client ile yeni sorgu atılması gerekiyor
	};

	return (
		<div className="mt-10 flex items-center justify-between">
			<div>
				<h2 className="text-[30px] font-bold">Cars Catalog</h2>
				<h2>Explore cars you might like</h2>
			</div>
			<div className="flex gap-5">
				<select
					className="select select-bordered w-full max-w-xs"
					onChange={handlePriceFilterChange}
				>
					<option disabled defaultValue={"price"}>
						Price
					</option>
					<option>Min to Max</option>
					<option>Max to Min</option>
				</select>
				<select
					className="select select-bordered w-full md:block max-w-xs hidden"
					onChange={handleBrandChange}
				>
					<option defaultValue={"All"}>Manufacturer</option>
					{brands.map((brand: Brand, index: number) => (
						<option key={index} value={brand.carBrand}>
							{brand.carBrand}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default CarsFilterOption;

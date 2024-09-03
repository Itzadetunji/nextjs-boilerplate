"use client";

import useCustomToast from "@/components/CustomToast";
import { countryOptions } from "@/utils/constants";
import { useCallback, useState } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	Suggestions,
} from "use-places-autocomplete";

export const useAddressAutocomplete = (
	onGetAddress: (
		address: string,
		city: string,
		province: string,
		country: string,
		state: string
	) => void
) => {
	const {
		ready,
		value,
		suggestions: { data },
		setValue,
		// clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
	});

	const [selected, setSelected] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const customToast = useCustomToast();

	// const user = useUserStore((s) => s.user);

	const handleSelectSuggestion = useCallback((suggestion: string) => {
		try {
			setIsLoading(true);
			setSelected(suggestion);
			// clearSuggestions();
			// setValue(suggestion);

			getGeocode({ address: suggestion }).then((results) => {
				const addressComponents = results[0].address_components;

				let city = "";
				let province = "";
				let country = "";
				let postalCode = "";

				for (const component of addressComponents) {
					const types = component.types;
					if (types.includes("locality")) {
						city = component.long_name;
					} else if (types.includes("administrative_area_level_1")) {
						province = component.long_name;
					} else if (types.includes("country")) {
						country = component.long_name;
					} else if (types.includes("postal_code")) {
						postalCode = component.long_name;
					}
				}

				onGetAddress(suggestion, city, province, country, postalCode);

				// const countryValue = findCountryByLabel(country);

				// setFormValue("city", city);
				// setFormValue("postal_code", postalCode);
				// setFormValue("address", suggestion.description);

				// const newProvinceOptions = changeCountry(countryValue);
				// setProvinceOptions(newProvinceOptions);

				// const newProvince = findProvinceByLabel(
				// 	newProvinceOptions,
				// 	province
				// );
				// updateCountryAndState(
				// 	setFormValue,
				// 	setProvinceOptions,
				// 	true,
				// 	newProvince,
				// 	countryValue
				// );
				// formTrigger();
			});
		} catch (error) {
			customToast("An error occured when fetching address", {
				id: "address",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	// useEffect(() => {
	// 	if (user?.business) {
	// 		setValue(user?.business?.address ?? "");
	// 	}
	// }, [user, setValue]);

	return {
		ready,
		value,
		suggestions: data,
		selected,
		isLoading,
		setSelected,
		setValue,
		handleSelectSuggestion,
	};
};

export const findCountryByLabel = (searchingCountry: string) => {
	return (
		countryOptions.find(
			(country) =>
				country.label.toLowerCase() === searchingCountry.toLowerCase()
		)?.value ?? ""
	);
};

export const findProvinceByLabel = (
	newProvinceOptions: { label: string; value: string }[],
	searchingProvince: string
) => {
	return (
		newProvinceOptions.find(
			(province) =>
				province.label.toLowerCase() === searchingProvince.toLowerCase()
		)?.value ?? ""
	);
};

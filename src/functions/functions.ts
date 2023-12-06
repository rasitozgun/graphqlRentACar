export const calculateDaysDifference = (
	startDate: string,
	endDate: string,
) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const difference = end.getTime() - start.getTime();

	const days = Math.ceil(difference / (1000 * 3600 * 24));

	return days;
};

export function formatPhoneNumber(value: string) {
	const digits = value.replace(/\D/g, "").slice(0, 10);
	let res = "";
	if (digits.length > 0) {
		res += `(${digits.slice(0, 3)}) `;
	}
	if (digits.length > 3) {
		res += `${digits.slice(3, 6)}`;
	}
	if (digits.length > 6) {
		res += `-${digits.slice(6)}`;
	}

	return res;
}

export const addZero = (num: number) => {
	return num < 10 ? `0${num}` : num;
};

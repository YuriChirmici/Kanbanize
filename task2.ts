const addDays = (date: Date, days: number): Date => {
	date.setDate(date.getDate() + days);
	return date;
}

const getWorkday = (firstWorkday: number, 
	lastWorkday: number, date: Date): string => {

	let workday: Date;

	let day: number = date.getDay();
	if (day === 0) {
		day = 7;
	}

	if (lastWorkday < firstWorkday) {
		if(day > lastWorkday && day < firstWorkday) {
			const difference: number = firstWorkday - day;
			workday = addDays(date, difference);
		}
		else {
			workday = date;
		}
	} else {
		if(day < firstWorkday) {
			const difference: number = firstWorkday - day;
			workday = addDays(date, difference);
		} else if(day > lastWorkday) {
			const difference: number = 7 - day + firstWorkday;
			workday = addDays(date, difference);
		} else {
			workday = date;
		}
	}

	return workday.toString();
}

enum WeekDays {
	Monday = 1,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
}

const firstWorkday = getWorkday(WeekDays.Monday,
	WeekDays.Friday, new Date(2021, 5, 5));
console.log(firstWorkday); // Mon Jun 07 2021 00:00:00

// const firstWorkday = getWorkday(WeekDays.Thursday,
// WeekDays.Monday, new Date(2021, 5, 5));
// console.log(firstWorkday); // Mon Jun 05 2021 00:00:00
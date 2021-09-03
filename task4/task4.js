Date.prototype.getWeek = function() {
	const onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const file = document.getElementById('file');
file.addEventListener("change", handleFiles, false);

const buttons = document.querySelector('.buttons');
const button = document.querySelectorAll('.btn');
const ctx = document.getElementById("myChart");

let myChart = new Chart(ctx, {});

function handleFiles(e) {
	selectedFile = file.files[0];
	const reader = new FileReader();
	reader.readAsText(selectedFile)
	reader.onload = function() {
		const arrData = formatData(reader.result);
		buttons.style.display = 'flex';
		renderChart(groupData(arrData));
	};
}

function formatData(data) {
	const arr = data.split('\n');
	arr.splice(0, 1);
	if (arr[arr.length - 1] === '') {
		arr.splice(arr.length - 1, 1);
	}

	let newArr = [];
	arr.forEach( row => {
		const newRow = row.split(',');
		if (newRow[3].trim() !== ""){
			[cardID, title, createdAt, startDate] = newRow;
			newArr.push({cardID, title, createdAt, startDate});
		}
	})

	return newArr;
}

function groupData(data) {
	let groupMark = "day";
	button.forEach(btn => {
		if (btn.classList.contains("active")) {
			groupMark = btn.id;
		}
	});

	switch(groupMark) {
		case "day":  return groupByDay(data);
		case "week":  return groupByWeek(data);
		case "month":  return groupByMonth(data);
		default: return groupByDay(data); 
	}
}

function groupByDay(data) {
	const groupObj = {};
	data.forEach(el => {
		const key = el.startDate.split(' ')[0];
		if (key in groupObj) {
			groupObj[key]++;
		} else {
			groupObj[key] = 1;
		}
	})
	return groupObj;
}

function groupByWeek(data) {
	const groupObj = {};
	data.forEach(el => {
		const stringDate = el.startDate.split(' ')[0].split('-');

		if (stringDate[1].length === 1) {
			stringDate[1] = '0' + stringDate[1];
		}

		let week = (new Date(stringDate.join('-'))).getWeek() + '';
		if (week.length === 1) {
			week = '0' + week;
		}
		key = `${stringDate[0]}-${week}`;
		if (key in groupObj) {
			groupObj[key]++;
		} else {
			groupObj[key] = 1;
		}
	})
	return groupObj;
}

function groupByMonth(data) {
	const groupObj = {};
	data.forEach(el => {
		const key = el.startDate.split(' ')[0].split('-').slice(0, 2).join('-');
		if (key in groupObj) {
			groupObj[key]++;
		} else {
			groupObj[key] = 1;
		}
	})
	return groupObj;
}

function getRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `${r}, ${g}, ${b}`;
}

function renderChart(cardsData) {
	let keys = Object.keys(cardsData);
	keys.sort();

	const labels = [];
	const data = [];
	const backgroundColor = [];
	const borderColor = [];

	keys.forEach( (key) => {
		const color = getRandomColor();
		labels.push(key);
		data.push(cardsData[key]);
		backgroundColor.push(`rgba(${color}, 0.2)`);
		borderColor.push(`rgba(${color}, 1)`);
	});
	
	myChart.destroy();
	myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels,
			datasets: [{
				label: 'броя започнати карти',
				data,
				backgroundColor,
				borderColor,
				borderWidth: 1
			}]
		}
	});
	myChart.update();
} 

function setActive(e) {
	button.forEach( btn => btn.classList.remove("active"))
	e.currentTarget.classList.add("active");

}

button.forEach( btn => {
	btn.addEventListener("click", handleFiles, false);
	btn.addEventListener("click", setActive, false); 
	
});
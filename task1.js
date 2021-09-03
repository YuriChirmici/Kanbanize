const groupByNumber = (arrayData, func) => {
	let group = {};
	arrayData.forEach( item => {
		let key = func(item);
		(key in group) ? group[key].push(item) : group[key] = [ item ];
	})
	return group;
}

const arrayData = [[1, 1, 2], [2, 3], [3, 5], [1, 4, 3]];
const stringData = ['elit', 'lorem', 'sit', 'ipsum', 'amet'];

const groupsBy1 = groupByNumber(arrayData, (a) => a.length);
const groupsBy2 = groupByNumber(stringData, (a) => a.length);

console.log(groupsBy1);
console.log(groupsBy2);
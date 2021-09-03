class DOMManipulator {
	static setPadding(element, padding) {
		element.style.padding = padding + 'px';
	}

	static setMargin(element, margin) {
		element.style.margin = margin + 'px';
	}

	static setHeight(element, height) {
		element.style.height = height + 'px';
	}

	static setWidth(element, width) {
		element.style.width = width + 'px';
	}

	static getPosition(element) {
		let box = element.getBoundingClientRect();

		return {
			top: box.top,
			left: box.left
		};
	}

	static addOnClickAction(element, action) {
		element.onclick = action;
	}
}

const element = document.getElementById('task_1');
DOMManipulator.setPadding(element, 10);
DOMManipulator.setMargin(element, 10);
DOMManipulator.setHeight(element, 10);
DOMManipulator.setWidth(element, 10);

console.log(DOMManipulator.getPosition(element));
DOMManipulator.addOnClickAction(element, () => console.log("yo"));
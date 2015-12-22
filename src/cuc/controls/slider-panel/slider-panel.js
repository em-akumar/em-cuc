class SliderPanel {
	constructor() {

	}
	static load() {
		Array.from(document.querySelectorAll(".em-slider-menu")).forEach((el) => el.querySelector('.em-slider-icon').addEventListener('click', function () {
			let content = el.parentNode.querySelector('.em-slider-content');
			let iconImg = el.querySelector('.em-slider-icon');
			content.classList.toggle("push");
			el.parentNode.classList.toggle("push");
			iconImg.classList.toggle("push");
			el.classList.toggle("push");
		}));
	}

}

export {SliderPanel};
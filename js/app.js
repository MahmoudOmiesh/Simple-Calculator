const themeButtons = document.querySelector(".header__themes");
const themeBall = document.querySelector(".header__ball");
const buttons = document.querySelector(".buttons");
const output = document.querySelector(".screen");
let firstNumber;
let secondNumber;
let operation;
let result;
let decimalCount = 0;

// Theme Switcher

themeButtons.addEventListener("click", (e) => {
	if (e.target.classList.contains("theme-one")) {
		document.documentElement.dataset.theme = "one";
		themeBall.style.left = "5%";
	} else if (e.target.classList.contains("theme-two")) {
		document.documentElement.dataset.theme = "two";
		themeBall.style.left = "calc(50% - 6px)";
	} else {
		document.documentElement.dataset.theme = "three";
		themeBall.style.left = "75%";
	}
});

buttons.addEventListener("click", Init);
function Init(e) {
	if (
		//Check if number ends and decimal and doesnt allow to add another decimal point
		e.target.classList.contains("decimal") &&
		output.textContent.split("")[output.textContent.length - 1] === "."
	) {
		return;
	} else if (e.target.classList.contains("decimal") && decimalCount < 1) {
		// only one decimal point per number
		output.textContent += e.target.textContent;
		decimalCount = 1;
	}

	if (
		// add numbers to screen
		e.target.classList.contains("number")
	) {
		output.textContent += e.target.textContent;
	}

	if (e.target.classList.contains("number") && result.toString().length > 0) {
		// if you type a number when there is an answer it resets and types the number
		reset();
		output.textContent += e.target.textContent;
	}

	if (e.target.classList.contains("delete") && result) {
		// cant delete result
		return;
	} else if (e.target.classList.contains("delete")) {
		// delete button removes last char
		output.textContent = output.textContent.slice(0, -1);
	} else if (e.target.classList.contains("operation") && result) {
		// Can't press operation button when Result Is displayed
		return;
	}

	if (
		// check if number doesnt end in decimal point or operation sign, set operation and first number
		e.target.classList.contains("plus") &&
		+output.textContent && // this checks if it is a number so you can't add plus with no number before
		output.textContent.split("")[output.textContent.length - 1] !== "." // this checks if screen doesn;t end in decimal point
	) {
		operation = "addition";
		firstNumber = +output.textContent;
		output.textContent += e.target.textContent;
		decimalCount = 0; // reset decimal count so second number can have one decimal point only
	} else if (
		e.target.classList.contains("minus") &&
		+output.textContent &&
		output.textContent.split("")[output.textContent.length - 1] !== "."
	) {
		operation = "subtraction";
		firstNumber = +output.textContent;
		output.textContent += e.target.textContent;
		decimalCount = 0;
	} else if (
		e.target.classList.contains("times") &&
		+output.textContent &&
		output.textContent.split("")[output.textContent.length - 1] !== "."
	) {
		operation = "multiplication";
		firstNumber = +output.textContent;
		output.textContent += e.target.textContent;
		decimalCount = 0;
	} else if (
		e.target.classList.contains("divide") &&
		+output.textContent &&
		output.textContent.split("")[output.textContent.length - 1] !== "."
	) {
		operation = "divison";
		firstNumber = +output.textContent;
		output.textContent += e.target.textContent;
		decimalCount = 0;
	}

	if (e.target.classList.contains("equal")) {
		// evaluate result on equal press
		evaluateResult();
	}

	if (e.target.classList.contains("reset")) {
		// reset on reset press
		reset();
	}
}

function evaluateResult() {
	if (operation === "addition") {
		// get second number by splitting text content to two and getting number after operation sign
		secondNumber = +output.textContent.split("+")[1];
	} else if (operation === "subtraction") {
		secondNumber = +output.textContent.split("-")[1];
	} else if (operation === "multiplication") {
		secondNumber = +output.textContent.split("x")[1];
	} else if (operation === "divison") {
		secondNumber = +output.textContent.split("/")[1];
	}
	if (operation === "addition") {
		result = firstNumber + secondNumber;
		output.textContent = result;
	} else if (operation === "subtraction") {
		result = firstNumber - secondNumber;
		output.textContent = result;
	} else if (operation === "multiplication") {
		result = firstNumber * secondNumber;
		output.textContent = result;
	} else if (operation === "divison") {
		result = firstNumber / secondNumber;
		output.textContent = result;
	}
}

function reset() {
	//resets everything
	output.textContent = "";
	result = undefined;
	firstNumber = undefined;
	secondNumber = undefined;
	operation = undefined;
}

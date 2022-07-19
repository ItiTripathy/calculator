const display = document.querySelector(".calculator__display").childNodes[1];

const acBtn = document.querySelector("#ac");

const digitBtns = document.querySelectorAll(".calculator__grid--item-digits");

const operatorBtns = document.querySelectorAll(
    ".calculator__grid--item-operators"
);

let initialValue = 0;
let currentOperator = "=";
let beginNextCalculation = false;

const calculate = (initialVal, currentVal, operator) => {
    let result;

    switch (operator) {
        case "+":
            result = Number(initialVal) + Number(currentVal);
            break;
        case "−":
            result = Number(initialVal) - Number(currentVal);
            break;
        case "×":
            result = Number(initialVal) * Number(currentVal);
            break;
        case "÷":
            result = Number(initialVal) / Number(currentVal);
            break;
        default:
            result = currentVal;
    }
    if (String(result).length > 10) {
        return result.toFixed(4);
    }
    return result;
};

const digitClick = (digit) => {
    if (display.textContent === "0") {
        if (digit === ".") {
            display.textContent = "0.";
        } else {
            display.textContent = digit;
        }
    } else if (beginNextCalculation === true) {
        if (digit === ".") {
            display.textContent = "0.";
        } else {
            display.textContent = digit;
        }
        beginNextCalculation = false;
    } else {
        display.textContent = display.textContent + digit;
    }
};

acBtn.addEventListener("click", () => {
    display.textContent = 0;
    initialValue = 0;
});

digitBtns.forEach((digBtn) => {
    digBtn.addEventListener("click", () => {
        const digit = digBtn.textContent.trim();

        digitClick(digit);
    });
});

operatorBtns.forEach((operator) => {
    operator.addEventListener("click", () => {
        const currentValue = display.textContent;

        const result = calculate(initialValue, currentValue, currentOperator);

        display.textContent = result;

        initialValue = result;

        beginNextCalculation = true;

        currentOperator = operator.textContent.trim();
    });
});

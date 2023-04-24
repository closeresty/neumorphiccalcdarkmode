const calculator = {
    num1: "",
    num2: "",
    operator1: "",
    operator2: "",
    answer: null,
    digitCount: 0
  };
  
  let output = document.getElementById("output");
  
  function resetDisplay() {
    (calculator.num1 = ""),
      (calculator.num2 = ""),
      (calculator.operator1 = ""),
      (calculator.operator2 = ""),
      (calculator.answer = null),
      (calculator.digitCount = 0);
  }
  function resetAfterEquals() {
    (calculator.operator1 = ""),
      (calculator.num1 = ""),
      (calculator.num2 = ""),
      (calculator.digitCount = 0);
  }
  function updateDisplay() {
    if (calculator.operator1 == "" && calculator.answer == null) {
      output.value = calculator.num1;
    }
    if (calculator.operator1 != "") {
      output.value = calculator.num2;
    }
    if (calculator.answer != null) {
      output.value = calculator.answer;
    }
  }
  
  function inputDigit(digit) {
    if (calculator.operator1 === "" && calculator.answer == null) {
      if (calculator.digitCount == 9) {
        return;
      }
      calculator.num1 += digit;
    }
    if (calculator.operator1 !== "") {
      if (calculator.num2 == "") {
        calculator.digitCount = 0;
      }
      if (calculator.digitCount == 9) {
        return;
      }
      calculator.num2 += digit;
    }
    if (calculator.answer != null) {
      calculator.num1 += digit;
      calculator.answer = null;
    }
    calculator.digitCount++;
  }
  
  function handleOperator(operator) {
    Number.prototype.countDecimals = function () {
      if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
      return this.toString().split(".")[1].length || 0;
    };
    if (calculator.operator1 === "") {
      calculator.operator1 = operator;
      digitCount = 0;
    }
    if (calculator.operator1 != "" && calculator.num2 === "") {
      calculator.operator1 = operator;
      digitCount = 0;
    }
    if (calculator.num1 == "" && calculator.answer != null) {
      calculator.num1 = calculator.answer;
      calculator.answer = null;
    }
  
    function addition() {
      return parseFloat(calculator.num1) + parseFloat(calculator.num2);
    }
  
    function subtraction() {
      return parseFloat(calculator.num1) - parseFloat(calculator.num2);
    }
  
    function multiply() {
      return parseFloat(calculator.num1) * parseFloat(calculator.num2);
    }
  
    function divide() {
      return parseFloat(calculator.num1) / parseFloat(calculator.num2);
    }
  
    if (operator === "=") {
      let temp = 0;
      if (calculator.operator1 != "" && calculator.num2 === "") {
        return;
      }
      if (calculator.operator1 === "+") {
        temp = addition();
      }
      if (calculator.operator1 === "-") {
        temp = subtraction();
      }
      if (calculator.operator1 === "*") {
        temp = multiply();
      }
      if (calculator.operator1 === "/") {
        temp = divide();
      }
      if (temp.toString().includes(".")) {
        calculator.answer =
          temp.countDecimals() > 6 ? temp.toExponential(6) : temp;
      }
      if (!temp.toString().includes(".")) {
        calculator.answer =
          temp.toString().length > 9 ? temp.toExponential(6) : temp;
      }
      resetAfterEquals();
    }
  
    if (operator === "+/-") {
      if (calculator.num1 == "") {
        return;
      }
      if (
        calculator.num1 != "" &&
        calculator.num2 == "" &&
        calculator.answer == null
      ) {
        calculator.num1 *= -1;
      }
      if (
        calculator.num1 != "" &&
        calculator.num2 == "" &&
        calculator.answer != null
      ) {
        calculator.num1 *= -1;
        calculator.answer *= -1;
      }
      if (calculator.num2 != "") {
        calculator.num2 *= -1;
      }
    }
  }
  
  function handlePercent() {
    if (calculator.operator1 == "") {
      calculator.answer = calculator.num1 / 100;
    }
    if (calculator.operator1 == "-") {
      calculator.answer =
        parseFloat(calculator.num1) * (parseFloat(calculator.num2) / 100);
    }
    if (calculator.operator1 == "+") {
      calculator.answer =
        (parseFloat(calculator.num1) / 100) * parseFloat(calculator.num2);
    }
    if (calculator.operator1 == "*") {
      calculator.answer =
        parseFloat(calculator.num1) +
        parseFloat(calculator.num1) * (parseFloat(calculator.num2) / 100);
    }
    resetAfterEquals();
  }
  
  function handleDecimal(decimal) {
    if (calculator.operator1 == "") {
      if (!calculator.num1.includes(decimal)) {
        calculator.num1 += decimal;
      }
    }
    if (calculator.operator1 != "") {
      if (!calculator.num2.includes(decimal)) {
        calculator.num2 += decimal;
      }
    }
  }
  
  //////// handle button push
  const keys = document.querySelector(".calculator__buttons__container");
  let current = "";
  keys.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches("button")) {
      return;
    }
  
    if (target.classList.contains("digit")) {
      inputDigit(target.value);
    }
  
    if (target.classList.contains("operator")) {
      if (target.value != "=") {
        if (target.value == current.value) {
          current.classList.remove("selected");
        }
        if (target.value != current.value && target.value != "+/-") {
          if (current != "") {
            current.classList.remove("selected");
          }
          target.classList.toggle("selected");
        }
        current = document.querySelector(".selected")
          ? document.querySelector(".selected")
          : "";
      }
      if (target.value == "=") {
        if (current != "") {
          current.classList.remove("selected");
          current = "";
        }
      }
  
      handleOperator(target.value);
    }
  
    if (target.classList.contains("percent")) {
      if (current != "") {
        current.classList.remove("selected");
        current = "";
      }
      handlePercent(target.value);
    }
  
    if (target.classList.contains("decimal")) {
      handleDecimal(target.value);
    }
  
    if (target.classList.contains("allClear")) {
      if (current != "") {
        current.classList.remove("selected");
        current = "";
      }
      resetDisplay();
    }
  
    updateDisplay();
  });
  
  document.getElementById("switchBox").addEventListener("click", function () {
    let mainContainer = document.getElementById("wrapper");
    mainContainer.classList.toggle("dark");
    mainContainer.classList.toggle("light");
  });
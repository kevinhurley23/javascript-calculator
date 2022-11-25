import { useState } from "react";

function App() {
  //variables
  const buttons = [
    {
      value: "AC",
      id: "clear",
      className: "number",
      key: "c",
    },
    {
      value: "back",
      id: "backspace",
      className: "number",
      key: "backspace",
    },
    {
      value: "=",
      id: "equals",
      className: "wide",
      key: "=",
    },
    {
      value: "7",
      id: "seven",
      className: "number",
      key: "7",
    },
    {
      value: "8",
      id: "eight",
      className: "number",
      key: "8",
    },
    {
      value: "9",
      id: "nine",
      className: "number",
      key: "9",
    },
    {
      value: "/",
      id: "divide",
      className: "operator",
      key: "/",
    },
    {
      value: "4",
      id: "four",
      className: "number",
      key: "4",
    },
    {
      value: "5",
      id: "five",
      className: "number",
      key: "5",
    },
    {
      value: "6",
      id: "six",
      className: "number",
      key: "6",
    },
    {
      value: "*",
      id: "multiply",
      className: "operator",
      key: "*",
    },
    {
      value: "1",
      id: "one",
      className: "number",
      key: "1",
    },
    {
      value: "2",
      id: "two",
      className: "number",
      key: "2",
    },
    {
      value: "3",
      id: "three",
      className: "number",
      key: "3",
    },
    {
      value: "-",
      id: "subtract",
      className: "operator",
      key: "-",
    },
    {
      value: "0",
      id: "zero",
      className: "number wide",
      key: "0",
    },
    {
      value: ".",
      id: "decimal",
      className: "number",
      key: ".",
    },
    {
      value: "+",
      id: "add",
      className: "operator",
      key: "+",
    },
  ];

  const operators = ["AC", "back", "/", "*", "+", "-", "="];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const posNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //state
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState(0);
  const [lastNum, setLastNum] = useState("");

  const lastChar = formula.charAt(formula.length - 1);
  const secondLastChar = formula.charAt(formula.length - 2);

  //functions
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        calculate();
        break;
      case "AC":
        clearAll();
        break;
      case "back" || "Backspace":
        backspace();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  function calculate() {
    const total = eval(formula);
    if (formula.indexOf("=") === -1) {
      setResult(total);
      setFormula((prev) => prev + "=" + total.toString());
    }
  }

  function clearAll() {
    setFormula("");
    setLastNum("");
    setResult(0);
  }

  function backspace() {
    if (formula.length > 1 && formula.indexOf("=") === -1) {
      if (operators.includes(lastChar) && !operators.includes(secondLastChar)) {
        setFormula((prev) => prev.substring(0, prev.length - 1));
        setResult(lastNum);
      } else {
        setFormula((prev) => prev.substring(0, prev.length - 1));
        setResult((prev) => prev.substring(0, prev.length - 1));
      }
      if (numbers.includes(lastChar)) {
        setLastNum((prev) => prev.substring(0, prev.length - 1));
      }
    } else {
      setLastNum("");
      setFormula("");
      setResult(0);
    }
  }

  function handleNumbers(value) {
    if (operators.includes(result.toString().substring(0))) {
      setResult("");
    }
    if (result === 0 && value !== "0") {
      setFormula(value);
      setResult(value);
    } else if (
      posNumbers.includes(result.toString().charAt(0)) ||
      posNumbers.includes(value)
    ) {
      setFormula((prev) => prev + value);
      setResult((prev) => prev + value);
    }
    if (operators.includes(lastChar)) {
      setLastNum(value);
    } else {
      setLastNum((prev) => prev + value);
    }
  }

  function dotOperator() {
    if (result.toString().indexOf(".") === -1) {
      setFormula((prev) => prev + ".");
      setResult((prev) => prev + ".");
      setLastNum((prev) => prev + ".");
    }
  }

  function handleOperators(value) {
    if (formula.indexOf("=") > 0) {
      setFormula(result + value);
      setResult(value);
    } else if (result === 0 && value !== "-") {
      setFormula("");
      setResult(0);
    } else if (
      numbers.includes(lastChar) ||
      (value === "-" && lastChar !== "-")
    ) {
      setFormula((prev) => prev + value);
      setResult(value);
    } else if (lastChar !== value) {
      if (operators.includes(secondLastChar)) {
        let temp = formula.substring(0, formula.length - 2);
        setFormula(temp + value);
        setResult(value);
      } else {
        let temp = formula.substring(0, formula.length - 1);
        setFormula(temp + value);
        setResult(value);
      }
    }
  }

  //App
  return (
    <div id="calculator">
      <span id="formulaScreen">{formula}</span>
      <span id="display">{result}</span>
      <div id="controls">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            className={btn.className}
            value={btn.value}
            onClick={() => handleInput(btn.value)}
          >
            {btn.value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

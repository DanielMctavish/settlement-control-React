import { useState } from "react";
import "../../styles/widgets/Calculator.css";

function Calculator() {
    const [display, setDisplay] = useState("0");
    const [operation, setOperation] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    
    const clearAll = () => {
        setDisplay("0");
        setOperation(null);
        setPrevValue(null);
        setWaitingForOperand(false);
    };
    
    const clearDisplay = () => {
        setDisplay("0");
    };
    
    const toggleSign = () => {
        const newValue = parseFloat(display) * -1;
        setDisplay(String(newValue));
    };
    
    const inputPercent = () => {
        const currentValue = parseFloat(display);
        const newValue = currentValue / 100;
        setDisplay(String(newValue));
    };
    
    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
            return;
        }
        
        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };
    
    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(digit) : display + digit);
        }
    };
    
    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);
        
        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operation) {
            const currentValue = prevValue || 0;
            let newValue;
            
            switch (operation) {
                case "+":
                    newValue = currentValue + inputValue;
                    break;
                case "-":
                    newValue = currentValue - inputValue;
                    break;
                case "×":
                    newValue = currentValue * inputValue;
                    break;
                case "÷":
                    newValue = currentValue / inputValue;
                    break;
                default:
                    newValue = inputValue;
            }
            
            setPrevValue(newValue);
            setDisplay(String(newValue));
        }
        
        setWaitingForOperand(true);
        setOperation(nextOperation);
    };
    
    return (
        <div className="calculator-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <span className="material-symbols-outlined">calculate</span>
                    Calculadora
                </div>
            </div>
            
            <div className="widget-content">
                <div className="calculator">
                    <div className="calculator-display">{display}</div>
                    
                    <div className="calculator-keypad">
                        <div className="input-keys">
                            <div className="function-keys">
                                <button className="calculator-key key-clear" onClick={clearAll}>
                                    AC
                                </button>
                                <button className="calculator-key key-sign" onClick={toggleSign}>
                                    ±
                                </button>
                                <button className="calculator-key key-percent" onClick={inputPercent}>
                                    %
                                </button>
                            </div>
                            
                            <div className="digit-keys">
                                <button className="calculator-key key-0" onClick={() => inputDigit(0)}>
                                    0
                                </button>
                                <button className="calculator-key key-dot" onClick={inputDot}>
                                    .
                                </button>
                                <button className="calculator-key key-1" onClick={() => inputDigit(1)}>
                                    1
                                </button>
                                <button className="calculator-key key-2" onClick={() => inputDigit(2)}>
                                    2
                                </button>
                                <button className="calculator-key key-3" onClick={() => inputDigit(3)}>
                                    3
                                </button>
                                <button className="calculator-key key-4" onClick={() => inputDigit(4)}>
                                    4
                                </button>
                                <button className="calculator-key key-5" onClick={() => inputDigit(5)}>
                                    5
                                </button>
                                <button className="calculator-key key-6" onClick={() => inputDigit(6)}>
                                    6
                                </button>
                                <button className="calculator-key key-7" onClick={() => inputDigit(7)}>
                                    7
                                </button>
                                <button className="calculator-key key-8" onClick={() => inputDigit(8)}>
                                    8
                                </button>
                                <button className="calculator-key key-9" onClick={() => inputDigit(9)}>
                                    9
                                </button>
                            </div>
                        </div>
                        
                        <div className="operator-keys">
                            <button 
                                className={`calculator-key key-divide ${operation === "÷" ? "active" : ""}`}
                                onClick={() => performOperation("÷")}
                            >
                                ÷
                            </button>
                            <button 
                                className={`calculator-key key-multiply ${operation === "×" ? "active" : ""}`}
                                onClick={() => performOperation("×")}
                            >
                                ×
                            </button>
                            <button 
                                className={`calculator-key key-subtract ${operation === "-" ? "active" : ""}`}
                                onClick={() => performOperation("-")}
                            >
                                −
                            </button>
                            <button 
                                className={`calculator-key key-add ${operation === "+" ? "active" : ""}`}
                                onClick={() => performOperation("+")}
                            >
                                +
                            </button>
                            <button 
                                className="calculator-key key-equals"
                                onClick={() => performOperation("=")}
                            >
                                =
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator; 
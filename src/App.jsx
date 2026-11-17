import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const calculate = (firstValue, secondValue, op) => {
    switch (op) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue === 0 ? 'Error' : firstValue / secondValue
      default:
        return secondValue
    }
  }

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
      return
    }

    setDisplay((current) => (current === '0' ? String(digit) : current + digit))
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay((current) => `${current}.`)
    }
  }

  const clearCalculator = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const deleteLastDigit = () => {
    if (waitingForOperand) {
      setWaitingForOperand(false)
      return
    }

    setDisplay((current) => {
      if (current.length <= 1 || current === '-0') {
        return '0'
      }
      return current.slice(0, -1)
    })
  }

  const selectOperator = (nextOperator) => {
    const inputValue = Number(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator)
      setPreviousValue(result)
      setDisplay(String(result))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const evaluate = () => {
    if (operator === null || previousValue === null) {
      return
    }

    const result = calculate(previousValue, Number(display), operator)
    setDisplay(String(result))
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const buttons = [
    ['C', 'DEL', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.']
  ]

  const handleButtonClick = (value) => {
    if (/\d/.test(value)) {
      inputDigit(value)
      return
    }

    if (value === '.') {
      inputDecimal()
      return
    }

    if (value === 'C') {
      clearCalculator()
      return
    }

    if (value === 'DEL') {
      deleteLastDigit()
      return
    }

    if (['+', '-', '*', '/'].includes(value)) {
      selectOperator(value)
      return
    }

    if (value === '=') {
      evaluate()
    }
  }

  return (
    <main className="calculator-app">
      <div className="calculator">
        <div className="display-wrap">
          <p className="label">Math Studio</p>
          <div className="display" aria-live="polite">{display}</div>
        </div>

        <div className="keypad">
          {buttons.flat().map((button) => {
            const isWide = button === '0'
            const isAction = ['C', 'DEL', '+', '-', '*', '/', '='].includes(button)

            return (
              <button
                key={button}
                type="button"
                className={`key ${isAction ? 'action' : ''} ${isWide ? 'wide' : ''}`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default App

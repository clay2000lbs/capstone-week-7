class Calculator {
    constructor(previousOperandContainer, currentOperandContainer) {
        this.previousOperandContainer = previousOperandContainer   
        this.currentOperandContainer = currentOperandContainer
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {

    }
}

const numberBtn = document.querySelectorAll('number')
const operandBtn = document.querySelectorAll('operand')
const equalsBtn = document.querySelector('equals')
const deleteBtn = document.querySelector('delete')
const clearBtn = document.querySelector('clear')
const previousOperandContainer = document.querySelector('previous-operand')
const currentOperandContainer = document.querySelector('current-operand')

const calculator = new Calculator(previousOperandContainer, currentOperandContainer)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
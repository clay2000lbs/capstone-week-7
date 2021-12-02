
class Calculator {
    constructor(previousOperandContainer, currentOperandContainer) {
        this.previousOperandContainer = previousOperandContainer   
        this.currentOperandContainer = currentOperandContainer
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break    
            
            case '/':
                computation = prev / current
                break
            
            default:
                return
        }
        this.currentOperand = computation
        this.operation - undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandContainer.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandContainer.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandContainer.innerText = ''
        }
    }
  
};

const numberBtn = document.querySelectorAll('.number')
const operandBtn = document.querySelectorAll('.operand')
const equalsBtn = document.querySelector('#equals')
const deleteBtn = document.querySelector('.delete')
const clearBtn = document.querySelector('#clear')
const previousOperandContainer = document.querySelector('.previous-operand')
const currentOperandContainer = document.querySelector('.current-operand')
const saveBtn = document.querySelector('.save-button')
const savesContainer = document.querySelector('.saves-container')


const baseURL = `http://localhost:4004/api/calcSaves`

const savesCallback = ({ data: saves}) => appendSave(saves)
const errCallback = err => console.log(err)

const getSaves = () => axios.get(baseURL).then(savesCallback).catch(errCallback)
const createSaves = body => axios.post(baseURL, body).then(savesCallback).catch(errCallback)

const calculator = new Calculator(previousOperandContainer, currentOperandContainer)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operandBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

function createSaveLi(saves) {
    const saveLi = document.createElement('li')
    saveLi.classList.add('save')
    saveLi.textContent = `${saves}`   
    savesContainer.appendChild(saveLi)
}

function appendSave(arr) {
    savesContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createSaveLi(arr[i])
    }
}


saveBtn.addEventListener('click', button => {

    let bodyObj = {
        value: currentOperandContainer.innerText
    }

    createSaveLi(bodyObj.value)

    saves.value = ''
    
})

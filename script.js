class Diceroller {
    constructor(inputString) {
        this.inputString = inputString
        this.clear();
    }

    clear(){
        this.inputString = ''
        this.dicesize = ''
        this.dicequantity = ''
        this.result = ''
        this.lastresult = ''
        this.operation = undefined
        newResult.innerHTML = ''
    }

    roll(){
        let diceArray = []
        for (let i=0;i<this.dicequantity;i++){
            let randomDice = Math.ceil(Math.random()*this.dicesize)
            diceArray.push(randomDice);
    }
    console.log(diceArray)
    this.result = diceArray
}

    splitDice(){
      let array = this.inputString.split('d')
      console.log(array)
      this.dicequantity = array[0]
      this.dicesize = array[1] 
    }

    storeDice() {

    }

    chooseOperation(operation){
        
    }

    compute(){
            
    }

    update(){
        this.inputString =  inputString.value
}
    printResult(){
        oldResult.innerHTML = this.lastresult
        newResult.innerHTML = this.result
        this.lastresult = this.result
        this.result = ''
    }
}

const clearButton = document.querySelector('[data-clear')
let newResult = document.querySelector('[data-new-result]')
const oldResult = document.querySelector('[data-old-result]')
const rollButton = document.querySelector('[data-roll]')
const inputString = document.querySelector('[data-input]')

const diceroller = new Diceroller(inputString)

clearButton.addEventListener('click', button => {
    console.log('clearing...')
    diceroller.clear();
})

rollButton.addEventListener('click', button => {
    console.log("rolling...")
    diceroller.update();
    diceroller.splitDice();
    diceroller.roll();
    diceroller.printResult();
})
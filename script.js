class Diceroller {
    constructor(inputString, newResult, oldResult) {
        this.inputString = inputString
        this.newResult = newResult
        this.oldResult = oldResult
        this.clear();
    }

    //clears all of our attributes
    clear(){
        this.inputString = ''
        this.diceArrays = []
        this.arraysDiceArrays = []
        this.operationArray = []
        this.rolledDice = []
        this.lastrolledDice = []
        this.totaloftotals = []
        this.newerResult = ''
        this.olderResult = ''
        this.newResult.innerText = ''
        this.oldResult.innerText = ''
    }

     //updates our "this.inputString to equal what's typed into the form"
     update(){
        this.inputString = inputString.value;
    }
    
    //splits our string into an array of dice arrays and an array of operations
    splitDice(){
        this.diceArrays = this.inputString.split(/[-+*\/]/)
        for (let i=0;i<this.inputString.length;i++){
            if (this.inputString[i] === '-' || this.inputString[i] === '+' || this.inputString[i] === '*' || this.inputString[i] === '/'){
                this.operationArray.push(this.inputString[i])
            }
        }
    }

    //splits our xdy, xdy array into seperate arrays
    splitArray(){
        let cutSplit;
        let notcutSplit;
        for (let i = 0; i<this.diceArrays.length; i++){
            if (this.diceArrays[i].includes('d')){
                cutSplit = this.diceArrays[i].split('d')
                this.arraysDiceArrays.push(cutSplit)
            } 
            else {
                notcutSplit = [this.diceArrays[i]]
                this.arraysDiceArrays.push(notcutSplit)
            }

        }
    }

    //rolls based on our arrayDiceArrays properties
    roll(){
        for (let i =0; i<this.arraysDiceArrays.length;i++){
        let size = this.arraysDiceArrays[i][1]
        let quantity = this.arraysDiceArrays[i][0]
        let drop = this.arraysDiceArrays[i][2]
        this.rollDice(size, quantity, drop);
        }
    }

    //helper function to roll our dice
    rollDice(size, quantity, drop){
        console.log(this.arraysDiceArrays)
        let heldDice = []

        for (let i =0; i<quantity;i++){
            
        if (size !== undefined){
        let randomDice = Math.ceil(Math.random()*size)
        heldDice.push(randomDice);
        }}
    
        if (size === undefined) {
        let loner = parseInt(quantity)
        heldDice.push(loner); 
        }
    
        if (drop != undefined){
            heldDice = heldDice.sort((a,b) => b-a).slice(0,heldDice.length-drop)
        } else {
            heldDice = heldDice.sort((a,b) => b-a)
        }

        this.rolledDice.push(heldDice);
        console.log(heldDice)
    }

    //individualy finds the sum of each dice array
    sumArrays(){
        let total = 0
        for (let i=0;i<this.rolledDice.length;i++){
            for (let j=0; j<this.rolledDice[i].length;j++){
                total = total + this.rolledDice[i][j]
            }
            this.totaloftotals.push(total);
            total = 0;
        }
    }

    //will either add, subtract, multiply, or divide the arrays into each other
    compute(){
        let computed = 0
        for (let i =0; i<this.totaloftotals.length;i++){
            if (this.operationArray[i] === '+' && this.totaloftotals[i+1] !== undefined){
                computed = this.totaloftotals[i] + this.totaloftotals[i+1]
                this.totaloftotals[i+1] = computed
            }
            if (this.operationArray[i] === '-' && this.totaloftotals[i+1] !== undefined){
                computed = parseInt(this.totaloftotals[i]) - parseInt(this.totaloftotals[i+1])
                this.totaloftotals[i+1] = computed
            }
            if (this.operationArray[i] === '*' && this.totaloftotals[i+1] !== undefined){
                computed = (this.totaloftotals[i]) * (this.totaloftotals[i+1])
                this.totaloftotals[i+1] = computed
            }
            if (this.operationArray[i] === '/' && this.totaloftotals[i+1] !== undefined){
                computed = this.totaloftotals[i] / this.totaloftotals[i+1]
                this.totaloftotals[i+1] = computed
            }
                this.newerResult = computed
            
        }
    }

    //update our DOMs with the new results and old results
    updateDom(){
        this.newResult.innerText = `${this.rolledDice} ${this.newerResult}`;
        this.oldResult.innerText = `${this.lastrolledDice} ${this.olderResult}`;
    }

    //getting us ready for the next click
    cleanup(){
        this.olderResult = this.newerResult
        this.newerResult = ''
        this.lastrolledDice = this.rolledDice
        this.rolledDice = []
        this.diceArrays = []
        this.arraysDiceArrays = []
        this.operationArray = []
        this.totaloftotals = []
    }
}

const clearButton = document.querySelector('[data-clear')
const newResult = document.querySelector('[data-new-result]')
const oldResult = document.querySelector('[data-old-result]')
const rollButton = document.querySelector('[data-roll]')
const inputString = document.querySelector('[data-input]')

const diceroller = new Diceroller(inputString, newResult, oldResult)

clearButton.addEventListener('click', button => {
    console.log('clearing...')
    diceroller.clear();
})

rollButton.addEventListener('click', button => {
    console.log("rolling...")
    diceroller.update();
    diceroller.splitDice();
    diceroller.splitArray();
    diceroller.roll();
    diceroller.sumArrays();
    diceroller.compute();
    diceroller.updateDom();
    diceroller.cleanup();
})
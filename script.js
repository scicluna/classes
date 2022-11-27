function no (item){
    return item.no
}

function color (item){
    return item.color
}

class Diceroller {
    constructor(inputString, newResult) {
        this.inputString = inputString
        this.newResult = newResult
        this.clear();
    }

    //clears all of our properties
    clear(){
        this.inputString = ''
        this.diceArrays = []
        this.arraysDiceArrays = []
        this.operationArray = []
        this.rolledDice = []
        this.lastrolledDice = []
        this.totaloftotals = []
        this.newResult.innerText = ''
        this.explosiveFlag = "off"
        this.flatArray = []
        this.coloredArray = []
    }

     //updates our this.inputString to equal what's typed into the form
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
            console.log(this.arraysDiceArrays)
        }
    }

    //rolls based on our arrayDiceArrays properties
    roll(){
        for (let i =0; i<this.arraysDiceArrays.length;i++){
        let size = this.arraysDiceArrays[i][1]
        let quantity = this.arraysDiceArrays[i][0]
        let drop = this.arraysDiceArrays[i][2]
        this.rollDice(size, quantity, drop);
        this.colorify(size)
        }
    }

    //helper function to roll our dice
    rollDice(size, quantity, drop){
        let heldDice = []

        if (size != undefined && size.includes('!')){
            size = size.replace(/!/g, '')
            this.explosiveFlag = "on"
            }

        for (let i =0; i<quantity;i++){
            
        if (size !== undefined){
        let randomDice = Math.ceil(Math.random()*size)

        if (randomDice == size && this.explosiveFlag == "on" && size != 1){
            i--
            this.explosiveFlag = "off"
        }

        heldDice.push(randomDice);
        }}
    
        if (size === undefined) {
        let loner = parseInt(quantity)
        heldDice.push(loner); 
        }
    
        if (drop !== undefined){
            heldDice = heldDice.sort((a,b) => b-a).slice(0,heldDice.length-drop)
        } else {
            heldDice = heldDice.sort((a,b) => b-a)
        }

        this.rolledDice.push(heldDice);
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
            if (this.operationArray[i] === undefined){
                computed = this.totaloftotals[i]
            }
                this.newerResult = computed
            
        }
    }

    flattenArray(){
           let arr1 = this.rolledDice.flat();
            this.flatArray = arr1
        }

    
    colorify(size){
        this.coloredArray = []
        console.log(this.rolledDice)
        console.log(size)

        let dicewecandealwith = this.rolledDice.flat();
        console.log(dicewecandealwith.length);


        for (let i=0;i<dicewecandealwith.length;i++){
            if (dicewecandealwith[i] == size){
                let newObject = Object.assign({}, dicewecandealwith[i])
                newObject.no = dicewecandealwith[i]
                newObject.color = "green"
                this.coloredArray.push(newObject)
            }
            else if (dicewecandealwith[i] == 1){
                let newObject = Object.assign({},dicewecandealwith[i])
                newObject.no = dicewecandealwith[i]
                newObject.color = "red"
                this.coloredArray.push(newObject)
            }
    
            else {
                let newObject = Object.assign({}, dicewecandealwith[i])
                newObject.no = dicewecandealwith[i]
                newObject.color = "black"
                this.coloredArray.push(newObject)
        }
    }

    console.log(this.coloredArray)
    }
    
    //update our DOMs with the new results
    updateDom(){
        const newDiv = document.createElement('div');1
        for (let i = 0;i<this.flatArray.length;i++){
            const numbertoadd = this.flatArray[i];
            //Create an Li
            let newLi = document.createElement('LI');
            //liContent must equal the content I want to display 
            let liContent = document.createTextNode(numbertoadd)
            newLi.appendChild(liContent);
            //color declarations
            if (color(this.coloredArray[i]) == "red"){
                newLi.className = newLi.className + " red"
            }
            if (color(this.coloredArray[i]) == "green"){
                newLi.className = newLi.className + " green"
            }
            setTimeout(function(){
                newLi.className = newLi.className +" show";  }, 10);
            

            this.newResult.appendChild(newLi)
            newDiv.appendChild(newLi);
        }
        this.newResult.appendChild(newDiv)

        //repeat for total
        let newLi2 = document.createElement('LI');
        let liContent2 = document.createTextNode(this.newerResult)
        newLi2.appendChild(liContent2);
        this.newResult.appendChild(newLi2)
        newDiv.appendChild(newLi2);
        setTimeout(function(){newLi2.className = newLi2.className +" show";  }, 10);
        newLi2.className = newLi2.className +" total"
        this.newResult.appendChild(newDiv)
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
        this.flatArray = []
        this.coloredArray =[]
    }
}

const clearButton = document.querySelector('[data-clear')
const newResult = document.querySelector('[data-new-result]')
const rollButton = document.querySelector('[data-roll]')
const inputString = document.querySelector('[data-input]')

const diceroller = new Diceroller(inputString, newResult)

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
    diceroller.flattenArray();
    diceroller.updateDom();
    diceroller.cleanup();
})

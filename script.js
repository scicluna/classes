//never actually called, but may need it at some point
function no (item){
    return item.no
}

//useful function for later
function color (item){
    return item.color
}

//establishing our diceroller class, where all of our work will take place
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
        this.tick = 0
        this.quantities = []
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
        }
    }

    //rolls based on our arrayDiceArrays properties
    roll(){
        //loop based on our rolldice perameters and for every item of arraysDiceArrays
        for (let i =0; i<this.arraysDiceArrays.length;i++){
        let size = this.arraysDiceArrays[i][1]
        let quantity = this.arraysDiceArrays[i][0]
        let drop = this.arraysDiceArrays[i][2]
        //creating a quantities array so that placing our operations is easier
        if (size !== undefined) {
            this.quantities.push(quantity)
        } else this.quantities.push(1)
        //run our roll dice and colorify functions to get rolledDice and coloredArray
        this.rollDice(size, quantity, drop);
        this.colorify(size)
        //only flatten at the very end
        if (i === this.arraysDiceArrays.length-1){
            this.flattenArray()
        }
        }
    }

    //helper function to roll our dice
    rollDice(size, quantity, drop){
        let heldDice = []
        //handles explosive dice feature
        if (size != undefined && size.includes('!')){
            size = size.replace(/!/g, '')
            this.explosiveFlag = "on"
            }
        
        //initate our for loop to roll as many dice as there are quantity of dice
        for (let i =0; i<quantity;i++){    
        //if there was no dice size, (like just +5), we don't want to run this. Otherwise, we roll a random dice
        if (size !== undefined){
        let randomDice = Math.ceil(Math.random()*size)
        //other half of the explosive dice tag
        if (randomDice == size && this.explosiveFlag == "on" && size != 1){
            i--
        }
        //pushing our generated dice into a temporary array
        heldDice.push(randomDice);
        }} 
        //ticking off explosive flag since not every set of dice rolls should necessarily explode
        this.explosiveFlag = "off"

        //if there is no size, set it equal to loner and push it into our heldDice array without rolling
        if (size === undefined) {
        let loner = parseInt(quantity)
        heldDice.push(loner); 
        }
        
        //handling our drop dice feature and sorting heldDice.
        if (drop !== undefined){
            heldDice = heldDice.sort((a,b) => b-a).slice(0,heldDice.length-drop)
        } else {
            heldDice = heldDice.sort((a,b) => b-a)
        }
        //pushing our heldDice array into our rolledDice array -- doing it in this order causes each xdy to be sorted seperately
        this.rolledDice.push(heldDice);
    }

    //individualy finds the sum of each dice array and puts them into another array
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
            //To include operators in dice addition. Goal is to splice in the next operator as denoted by this.tick whenever we hit the spot.
            let arr1 = this.rolledDice.flat();
            let spot = 0
            let lastspot = 0
            for (let i=0;i<arr1.length;i++){
                spot = lastspot + parseInt(this.quantities[this.tick])
                if (i === spot && this.operationArray[this.tick] !== undefined){
                    console.log('test')
                    arr1.splice(i, 0,this.operationArray[this.tick])
                    lastspot = spot+1
                    this.tick++
                }
            }
            //Setting our flat array equal to our fully suped-up array which now incldues operations
            this.flatArray = arr1
            console.log(this.flatArray)
        }

    //Coloring our array by building  an array of objects that has the same length as rolledDice
    colorify(size){
        this.coloredArray = []
        let dicewecandealwith = this.rolledDice.flat();

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
            //splicing out the operations from our numbertoadd array for the purpose of coloring the numbers. a bit hacky, idk if this is a good way to accomplish the desired outcome
            if (numbertoadd === '-' || numbertoadd === '+' || numbertoadd === '*' || numbertoadd === '/'){
                this.coloredArray.splice(i, 0, '');
            }
            //adding color and timeout classes for animation and ascetics
            if (color(this.coloredArray[i]) == "red"){
                newLi.className = newLi.className + " red"
            }
            if (color(this.coloredArray[i]) == "green"){
                newLi.className = newLi.className + " green"
            }
            setTimeout(function(){
                newLi.className = newLi.className +" show";  }, 10);
            
            //finishing our DOM change
            this.newResult.appendChild(newLi)
            newDiv.appendChild(newLi);
        }
        //wrapping our new LI in a div
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
        this.tick =0
        this.quantities = []
        this.quantityTick = 0
    }
}

//handles our tutorial button toggle
function textToggle() {
    if (tutorialText.classList.contains("show")){
        tutorialText.classList.remove("show")
        header.classList.remove("backdrop")
        inputs.classList.remove("backdrop")
        newResult.classList.remove("backdrop")
        } else {  
        tutorialText.classList.add("show")
        header.classList.add("backdrop")
        inputs.classList.add("backdrop")
        newResult.classList.add("backdrop")
        }
}

//declaring DOMS
const clearButton = document.querySelector('[data-clear')
const newResult = document.querySelector('[data-new-result]')
const rollButton = document.querySelector('[data-roll]')
const inputs = document.querySelector('[data-inputs]')
const inputString = document.querySelector('[data-input]')
const header = document.querySelector('[data-header]')
const tutorialBtn = document.querySelector('[data-tutorial]')
const tutorialText = document.querySelector('[data-tutorialtext]')

//declaring our diceroller
const diceroller = new Diceroller(inputString, newResult)

//handles the clear button
clearButton.addEventListener('click', button => {
    console.log('clearing...')
    diceroller.clear();
})

//handles the roll button
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

//handles the roll button if you want to hit enter instead
inputString.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
        console.log("rolling...")
        diceroller.update();
        diceroller.splitDice();
        diceroller.splitArray();
        diceroller.roll();
        diceroller.sumArrays();
        diceroller.compute();
        diceroller.updateDom();
        diceroller.cleanup();
    }
})

//handles the tutorial toggle with the help of textToggle()
tutorialBtn.addEventListener('click', button =>{
    textToggle()
})
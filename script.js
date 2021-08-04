const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const decimal = document.getElementById("decimal");
const decimal_value =".";


const d1 = document.getElementById("display1");
const d2 = document.getElementById("display2"); 

const operatorList = {
    "+": operatorActions("+"),
    "*": operatorActions("*"),
    "-": operatorActions("-"),
    "/": operatorActions("/"),
    "%": operatorActions("/100*"),
    "clear":clearALL,
    "backspace":backspace,
    "=":calculateTotal
}

function operatorActions(value)
{
    return function()
    {
        printOnDisplay(value);
    }
}

operators.forEach(function(operatorNode)
{
    operatorNode.addEventListener("click",function(event)
    { 

        const operator = event.target.value;

        const action = operatorList[ operator ];

        action();
    });
})





numbers.forEach(function(numberNode)
{
    numberNode.addEventListener("click",function(event)
    {
        const number = event.target.value;
        printOnDisplay(number);

    });
})

decimal.addEventListener("click",function()
{
    printOnDisplay(decimal_value);
})



function printOnDisplay(value)
{

    const old_value = fetchOldValue();

    const is_valid_input = checkValidInput(old_value, value);

    is_valid_input && (d1.innerHTML = old_value + value) && liveCalculate();


}

function checkValidInput(old_value,new_value)
{
    const last_input_character = old_value[old_value.length -1];

    if(operatorList[last_input_character]&& operatorList[new_value]){
        return false;
    }
    if(old_value==decimal_value && new_value == decimal_value){
        alert("yoyo");
    }
    return true;
}


function fetchOldValue(){
    return d1.innerHTML;
}


function clearALL()
{
    d1.innerHTML ="";
    d2.innerHTML ="";
}
function backspace()
{
    let last_entry =fetchOldValue();
    d1.innerHTML = last_entry.slice(0,-1);
}

function calculateTotal()
{
    let result = Function(`return ${fetchOldValue()}`)(); 
    d1.innerHTML = result;
    d2.innerHTML = "";
}
function liveCalculate()
{
    let result = Function(`return ${fetchOldValue()}`)();

    d2.innerHTML = result;
}
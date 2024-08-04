
let firstOperand = 0;
let operator;
let secondOperand = 0

let ans = 0;

function operation() {
    if(operator === 'add'){
       ans = firstOperand + secondOperand
    } else if(operator === "sub"){
       ans = firstOperand - secondOperand

    } else if(operator === 'multi'){
        ans = firstOperand * secondOperand
       
    } else if(operator === 'div'){
        ans = firstOperand/secondOperand
      
    } else {
        console.log('Invalid operation!!')
    }
}
operation();
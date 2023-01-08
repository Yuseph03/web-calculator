let resultBar = document.querySelector(".result");
let equal = document.querySelector("#equal");  
let numBtns = Array.from(document.querySelectorAll(".num"));
let operBtns = Array.from(document.querySelectorAll(".btn"));
let lastOper = document.querySelector(".last-operation");
let del = document.querySelector("#delete");
let clear = document.querySelector("#clear");
let result;

window.addEventListener('keydown', handleKeyboardInput)

let Obj = {};

//Adds functionality to number buttons
for(let i = 0; i < numBtns.length; i++){
  numBtns[i].addEventListener('click', (e) => {
  resultBar.textContent += e.target.textContent;
  });
}; 

//Adds functionality to operation buttons
for(let i = 0; i < operBtns.length; i++){
  operBtns[i].addEventListener('click', (e) => {
    resultBar.textContent += e.target.textContent;
    lastOper.textContent = resultBar.textContent;
    Obj.a = resultBar.textContent.slice(0, -1);
    resultBar.textContent = "";
    Obj.oper = e.target.textContent;
  });
}; 

equal.addEventListener("click", () => {
  Obj.b = resultBar.textContent;
  operator(Obj);
});

//Clears the result/last-operation bar
clear.addEventListener('click', () => {
  resultBar.textContent = "";
  lastOper.textContent = "";
});

//Deletes the last integer
del.addEventListener("click", () => {
  resultBar.textContent = resultBar.textContent.slice(0, -1);
});

//Adds keyboard functionality 
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9){
    resultBar.textContent += e.key;
  }
  if (e.key === '=' || e.key === 'Enter'){
    Obj.b = resultBar.textContent;
    operator(Obj);
  }
  if (e.key === 'Backspace'){
    resultBar.textContent = resultBar.textContent.slice(0, -1);
  }
  if (e.key === 'Escape'){
    for(key in Obj){
      delete Obj[key];
    }
    resultBar.textContent = "";
    lastOper.textContent = "";
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
    resultBar.textContent += e.key;
    lastOper.textContent = resultBar.textContent;
    Obj.a = resultBar.textContent.slice(0, -1);
    resultBar.textContent = "";
    Obj.oper = e.key; 
  }
}

const add = function(a, b) {
	return (Number(a) + Number(b));
};

const subtract = function(a, b) {
	return (a - b);
};

const multiply = function(a, b){
  return (a * b);
}

const divide = function(a, b){
  return (a / b);
}

//Determines the operator
function operator(Obj){
    if(Obj.oper == '+'){
        result = add(Obj.a, Obj.b)
    }
    else if(Obj.oper == '-'){
        result = subtract(Obj.a, Obj.b)
    }
    else if(Obj.oper == '*') {
      result = multiply(Obj.a, Obj.b)
    }
    else if(Obj.oper == '/') {
      result = divide(Obj.a, Obj.b)
    }

    if(Obj.a != null && Obj.oper != null){
      lastOper.textContent = Obj.a + Obj.oper + Obj.b + "=" + result
      resultBar.textContent = result;
    }
    
    //Deletes the history of previous operation
    for(key in Obj){
      delete Obj[key];
    }
    result = 0;
}
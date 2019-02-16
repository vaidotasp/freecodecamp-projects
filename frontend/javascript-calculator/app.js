window.onload = function() {
  let output ="";
  let numbers = Array.from(document.querySelectorAll('.number'));
  let operators = Array.from(document.querySelectorAll('.operator'));
  let field = document.getElementById("result");
  
  numbers.forEach(key => key.addEventListener('click', input));
  operators.forEach(oper => oper.addEventListener('click', operatorInput));

  function operatorInput(e) {
    if (field.value === "" || this.innerHTML === "C") {
      output = "";
      update();
    } else if (this.innerHTML === "=") {
        compute();
    } else {  
      output = output + this.innerHTML;
      update();
    }
  }


  function input(e) {
    output = output + this.innerHTML;
    update();
  }

  function update(){
    field.value = output;
  }
  
  function compute(){
    let result = eval(output).toString();
    if (result.length > 10) {
      result = result.slice(0,10);
    }
    field.value = result;
  }
};



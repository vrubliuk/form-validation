window.onload = function () {
  ChangeValue();
};



// ------------HTML5 Validation------------
// Since placeholder-shown pseudo class doesn't work in IE and Edge, the value of each input will be changed dynamically via JS
function ChangeValue() {
  var x = document.querySelectorAll("#exampleInputLogin1, #exampleInputEmail1, #exampleInputPassword1, #exampleInputConfirmPassword1, #exampleInputFirstName1, #exampleInputLastName1, #exampleInputPhone1, #month1, #day1, #year1");
  for (var i = 0; i < x.length - 1; i++) {
    x[i].onchange = function () {
      this.setAttribute('value', this.value);
    };
  }
}


// ------------JavaScript Validation------------
function ChangeBorderColorOnFocus() {
  var x = document.querySelectorAll(".myInput2, .mySelect2");
  // var x = document.getElementsByClassName("myInput2");
  for (var i = 0; i < x.length - 1; i++) {
    x[i].onfocus = function () {
      this.classList.remove("error");
      this.classList.remove("success");
      this.classList.add("onfocus");
    };
    x[i].onblur = function () {
      this.classList.remove("onfocus");
    };
  }
}
ChangeBorderColorOnFocus();


var required;
var valid;



document.getElementsByClassName("jsform")[0].onsubmit = function () {
  alert("asds");
};



function myInput (id, pattern, required) {
  this.id = id;
  this.pattern = pattern;
  this.required = required;
  this.empty = function () {
    var x = document.getElementById(id);
    return x.value.length > 0 ? false : true;
  };
  this.validate = function () {
    var x = document.getElementById(id);
    return this.pattern.test(x.value);
  };
  this.showSuccessorError = function () {
    var x = document.getElementById(id);
    if (this.validate() === true && this.empty() === false) {
      
      x.classList.remove("error");
      x.classList.add("success");
    } 
    else {
   
      x.classList.remove("success");
      x.classList.add("error");
    }
  };
  this.showError = function () {
    
  };
  this.showClear = function () {
    
  };

}

var myLogin = document.getElementById("exampleInputLogin2");
myLogin = new myInput("exampleInputLogin2", /a/);

document.getElementById("exampleInputLogin2").onblur = function () {
   myLogin.showSuccessorError();
};



//TEST
document.getElementById("click").onclick = function () {
  // alert (myLogin.validate());
//  alert(x.validate());
 myLogin.showSuccessorError();
  
};
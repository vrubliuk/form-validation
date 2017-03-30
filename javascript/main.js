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



function myInput (type, pattern,  valid, error) {
  this.type = type;
  this.myValue = function () {
    this.myValue = this.value;
  };
  this.pattern = pattern;
  this.empty = function () {
    this.empty = this.value.length > 0 ? true : false;
  };

}
var x = document.getElementById("exampleInputLogin2");


// x = new myInput();






//TEST
document.getElementById("click").onclick = function () {
  
  alert(x.value);
  
};
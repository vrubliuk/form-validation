window.onload = function () {
  ChangeValue();
};
// ------------HTML5 Validation------------
// Since placeholder-shown pseudo class doesn't work in IE and Edge, the value of each input will be changed dynamically via JS
function ChangeValue() {
  var x = document.querySelectorAll("#exampleInputLogin1, #exampleInputEmail1, #exampleInputPassword1, #exampleInputConfirmPassword1, #exampleInputFirstName1, #exampleInputLastName1, #exampleInputPhone1, #month1, #day1, #year1");
  for (var i = 0; i < x.length; i++) {
    x[i].onchange = function () {
      this.setAttribute('value', this.value);
    };
  }
}


// ------------JavaScript Validation------------



// function ChangeBorderColorOnFocus() {
//   var x = document.querySelectorAll(".myInput2, .mySelect2");
//   // var x = document.getElementsByClassName("myInput2");
//   for (var i = 0; i < x.length - 1; i++) {
//     x[i].onfocus = function () {
//       this.classList.remove("error");
//       this.classList.remove("success");
//       this.classList.add("onfocus");
//     };
//     x[i].onblur = function () {
//       this.classList.remove("onfocus");
//     };
//   }
// }
// ChangeBorderColorOnFocus();

// document.getElementsByClassName("jsform")[0].onsubmit = function () {
// };

// function myInput(id, pattern, required) {
//   this.id = id;
//   this.pattern = pattern;
//   this.required = required;
//   this.empty = function () {
//     var x = document.getElementById(id);
//     return x.value.length > 0 ? false : true;
//   };
//   this.validate = function () {
//     var x = document.getElementById(id);
//     return this.pattern.test(x.value);
//   };

//   this.onblur = function () {
//     if (this.validate() === true && this.empty() === false) {
//       this.classList.remove("error");
//       this.classList.add("success");
//     } else if (this.validate() === false && this.empty() === false) {
//       this.classList.remove("success");
//       this.classList.add("error");
//     }
//   };


//   this.showSuccessOrError = function () {
//     var x = document.getElementById(id);
//     if (this.validate() === true && this.empty() === false) {
//       this.classList.remove("error");
//       this.classList.add("success");
//     } else if (this.validate() === false && this.empty() === false) {
//       this.classList.remove("success");
//       this.classList.add("error");
//     }
//   };

//   this.showSuccessOrErrorOnSubmit = function () {
//     var x = document.getElementById(id);
//     if (this.validate() === true && this.empty() === false) {

//       x.classList.remove("error");
//       x.classList.add("success");
//     } else if (this.validate() === false && this.empty() === false) {
//       x.classList.remove("success");
//       x.classList.add("error");
//     }
//   };

//   this.showClear = function () {

//   };

// }


//TEST
// document.getElementById("click").onclick = function () {
// };


function Empty(x) {
  return x.value.length > 0 ? false : true;
}

function Validate(x, pattern) {
  return pattern.test(x.value);
}

function ShowOnFocus(x) {
  $(x).removeClass("error");
  $(x).removeClass("success");
  $(x).addClass("onfocus");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".error-text").css("visibility", "");
}

function CleanSuccessError(x) {
  $(x).removeClass("error");
  $(x).removeClass("success");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".error-text").css("visibility", "");
  x.value = "";
}

function ShowSuccess(x) {
  $(x).removeClass("error");
  $(x).addClass("success");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "block");
  $(x).siblings(".error-text").css("visibility", "");
}

function ShowError(x) {
  $(x).removeClass("success");
  $(x).addClass("error");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".icon-error").css("display", "block");
  $(x).siblings(".error-text").css("visibility", "visible");
}

function validate(id, pattern) {
  var x = document.getElementById(id);
  var y = pattern;
  x.onfocus = function () {
    ShowOnFocus(this);
  };
  x.onblur = function () {
    this.classList.remove("onfocus");
    var isEmpty = Empty(this);
    var isValid = Validate(this, y);
    if (isValid && !isEmpty) {
      ShowSuccess(this);
      return true;
    } else if (!isValid && !isEmpty) {
      ShowError(this);
      return false;
    }
  };
}


function confirm(id1, id2) {
  // id1 = input with initial password
  // id2 = input with confirmation of initial password
  var x = document.getElementById(id1);
  var y = document.getElementById(id2);
  x.onkeyup = function () {
    var xValue = document.getElementById(id1).value;
    var yValue = document.getElementById(id2).value;
    var isEmpty = Empty(y);
    var xValid = Validate(this, passwordPattern);
    if (xValid) {
      y.disabled = false;
      if (yValue === xValue && !isEmpty) {
        ShowSuccess(y);
      } else if (yValue !== xValue && !isEmpty) {
        ShowError(y);
      }
    } else {
      y.disabled = true;
      y.value = "";
      CleanSuccessError(y);
    }
  };
  y.onfocus = function () {
    ShowOnFocus(this);
  };
  y.onblur = function () {
    this.classList.remove("onfocus");
    var xValue = document.getElementById(id1).value;
    var yValue = document.getElementById(id2).value;
    var isEmpty = Empty(y);
    if (yValue === xValue && !isEmpty) {
      ShowSuccess(this);
    } else if (yValue !== xValue && !isEmpty) {
      ShowError(this);
    }
  };
}

function select(id) {
  var x = document.getElementById(id);
  x.onfocus = function () {
    $(x).removeClass("success");
    $(x).addClass("onfocus");
  };
  x.onblur = function () {
    $(x).removeClass("onfocus");
    var isEmpty = Empty(this);
    if (!isEmpty) {
      $(x).addClass("success");
    } 
  };
}


var loginPattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9]+$/;
var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var namePattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+$/;
var phonePattern = /^[0-9]{10}$/;


validate("inputLogin2", loginPattern);
validate("inputEmail2", emailPattern);
validate("inputPassword2", passwordPattern);
confirm("inputPassword2", "inputConfirmPassword2");
validate("inputFirstName2", namePattern);
validate("inputLastName2", namePattern);
validate("inputPhone2", phonePattern);
select("month2");
select("day2");
select("year2");
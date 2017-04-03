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

//GENERAL FUNCTIONS

// check if input is empty; return true or false
function Empty(x) {
  return x.value.length > 0 ? false : true;
}

// check if checkbox is checked; return true or false
function Checked(x) {
  return x.checked === true ? true : false;
}

// check if input is required; return true or false; you can add required input fields in body of this function
function Required(x) {
  if (
    x.id === "inputLogin2" ||
    x.id === "inputEmail2" ||
    x.id === "inputPassword2" ||
    x.id === "inputConfirmPassword2" ||
    x.id === "licenseAgreement2"
  ) {
    return true;
  } else {
    return false;
  }
}

// return initial error text after it is changed with "Please fill out this field"
function returnInitialErrorText(x) {
  var initialText;
  switch (x.id) {
    case "inputLogin2":
      initialText = "Should contain only letters and numbers";
      break;
    case "inputEmail2":
      initialText = "Must be a valid email address";
      break;
    case "inputPassword2":
      initialText = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
      break;
    case "inputConfirmPassword2":
      initialText = "The two passwords are not the same";
      break;
    case "inputFirstName2":
      initialText = "Should contain only letters";
      break;
    case "inputLastName2":
      initialText = "Should contain only letters";
      break;
    case "inputPhone2":
      initialText = "The number is not complete";
      break;
  }
  $(x).siblings(".error-text").text(initialText);
}

// show "Please fill out this field" input error on submit event
function showErrorEmptyInput(x) {
  $(x).siblings(".error-text").text("Please fill out this field");
  $(x).siblings(".error-text").css("visibility", "visible");
}

// show "Please check this box if you want to proceed"" initial checkbox error on submit event
function showErrorCheckbox(x) {
  $(x).parent().siblings(".error-text").css("visibility", "visible");
}
// hide "Please check this box if you want to proceed"" initial checkbox error on start of submit event
function hideErrorCheckbox(x) {
  $(x).parent().siblings(".error-text").css("visibility", "");
}
// hide checkbox error if it is checked on change event
var myCheckbox = document.getElementById("licenseAgreement2");
myCheckbox.onchange = function () {
  if (Checked(this)) {
    hideErrorCheckbox(this);
  }
};

//------------------------ONBLUR VALIDATION---------------------------

// check if input is valid; return true or false; used only on blur event
function Valid(x, pattern) {
  return pattern.test(x.value);
}
// change appearance of input field on focus (hide all errors, add blue border)
function ShowOnFocus(x) {
  $(x).removeClass("error");
  $(x).removeClass("success");
  $(x).addClass("onfocus");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".error-text").css("visibility", "");
  returnInitialErrorText(x);
}

// used only for password confirmation field; clean the input field
function CleanSuccessError(x) {
  $(x).removeClass("error");
  $(x).removeClass("success");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".error-text").css("visibility", "");
  x.value = "";
}

// change appearance of input field if it is filled out correctly
function ShowSuccess(x) {
  $(x).removeClass("error");
  $(x).addClass("success");
  $(x).siblings(".icon-error").css("display", "");
  $(x).siblings(".icon-success").css("display", "block");
  $(x).siblings(".error-text").css("visibility", "");
}

// change appearance of input field if it is filled out incorrectly
function ShowError(x) {
  $(x).removeClass("success");
  $(x).addClass("error");
  $(x).siblings(".icon-success").css("display", "");
  $(x).siblings(".icon-error").css("display", "block");
  $(x).siblings(".error-text").css("visibility", "visible");
}

// validate input field on blur event (show error or success); return standart appearance on focus event
function validate(id, pattern) {
  var x = document.getElementById(id);
  var y = pattern;
  x.onfocus = function () {
    ShowOnFocus(this);
  };
  x.onblur = function () {
    this.classList.remove("onfocus");
    var isEmpty = Empty(this);
    var isValid = Valid(this, y);
    if (isValid && !isEmpty) {
      ShowSuccess(this);
      return true;
    } else if (!isValid && !isEmpty) {
      ShowError(this);
      return false;
    }
  };
}

// ------------------------------------------------------------------
//sometimes there is an issue with IE (it changes value of input to "+38 (___) ___-__-__" after onfocus event, other browsers keep the input clear), this function is only for IE
//since now it is working good, the function is not in use

// function validateIE(id, pattern) {
//   var x = document.getElementById(id);
//   var y = pattern;
//   x.onfocus = function () {
//     ShowOnFocus(this);
//   };
//   x.onblur = function () {
//     alert(x.value);
//     this.classList.remove("onfocus");
//     var isValid = Valid(this, y);
//     if (isValid) {
//       ShowSuccess(this);
//       return true;
//     } else if (!isValid && (x.value !== "+38 (___) ___-__-__")) {
//       ShowError(this);
//       return false;
//     }
//   };
// }

// if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
//   validateIE("inputPhone2", phonePattern);
// } else {
//   validate("inputPhone2", phonePattern);
// } 
// ------------------------------------------------------------------

// check if initial password is valid; enable the confirmation input field and check if it is the same as initial password
// id1 = input with initial password
// id2 = input with confirmation of initial password
function confirm(id1, id2) {
  var x = document.getElementById(id1);
  var y = document.getElementById(id2);
  x.onkeyup = function () {
    var xValue = document.getElementById(id1).value;
    var yValue = document.getElementById(id2).value;
    var isEmpty = Empty(y);
    var xValid = Valid(this, passwordPattern);
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

// change appearance of select field if something was selected
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

// launch jquery plugin "INPUT MASK" for phone input field
function changePhoneInput() {
  var phone = [{
    "mask": "+38 (###) ###-##-##"
  }];
  $('#inputPhone2').inputmask({
    mask: phone,
    greedy: false,
    definitions: {
      '#': {
        validator: "[0-9]",
        cardinality: 1
      }
    }
  });
}
changePhoneInput();

// store patterns in variables
var loginPattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9]+$/;
var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var namePattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+$/;
var phonePattern = /^[^_]+$/;

// launch functions for inputs
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

//-------------ONSUBMIT VALIDATION----------------

// check if input is valid; return true or false; need only element at input
function Valid2(x) {
  var pattern;
  switch (x.id) {
    case "inputLogin2":
      pattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9]+$/;
      break;
    case "inputEmail2":
      pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      break;
    case "inputPassword2":
      pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      break;
    case "inputFirstName2":
      pattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+$/;
      break;
    case "inputLastName2":
      pattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+$/;
      break;
    case "inputPhone2":
      pattern = /^[^_]+$/;
      break;
  }
  if (Valid(x, pattern)) {
    return true;
  } else {
    return false;
  }
}

// check if initial password and confirmation password are the same; return true or false
function Valid3(id1, id2) {
  var xValue = document.getElementById(id1).value;
  var yValue = document.getElementById(id2).value;
  return xValue === yValue ? true : false;
}

// loop through all given inputs; show different types of errors; can return only false, if something is incorrect
function InputsOK() {
  var inputs = document.querySelectorAll("#inputLogin2, #inputEmail2, #inputPassword2, #inputConfirmPassword2, #inputFirstName2, #inputLastName2, #inputPhone2");
  for (var i = 0; i < inputs.length; i++) {
    var isEmpty = Empty(inputs[i]);
    var isRequired = Required(inputs[i]);
    var isValid;
    if (inputs[i].id === "inputConfirmPassword2") {
      isValid = Valid3("inputPassword2", "inputConfirmPassword2");
    } else if (inputs[i].id !== "inputConfirmPassword2") {
      isValid = Valid2(inputs[i]);
    }
    if (isEmpty && isRequired) {
      showErrorEmptyInput(inputs[i]);
      return false;
    } else if (!isEmpty && isRequired && !isValid) {
      return false;
    } else if (!isEmpty && !isRequired && !isValid) {
      return false;
    }
  }
}

// loop through all given checkboxes; show error; can return only false, if incorrect
function CheckboxesOK() {
  var checkboxes = document.querySelectorAll("#licenseAgreement2");
  for (var i = 0; i < checkboxes.length; i++) {
    var isChecked = Checked(checkboxes[i]);
    var isRequired = Required(checkboxes[i]);
    if (!isChecked && isRequired) {
      showErrorCheckbox(checkboxes[i]);
      return false;
    }
  }
}

// clean "Please fill out this field" error for inputs; used on start of submit event to avoid repeat of error for few input field after each submit event; help to process validation step by step 
function clearErrorEmptyInput() {
  var inputs = document.querySelectorAll("#inputLogin2, #inputEmail2, #inputPassword2, #inputConfirmPassword2, #inputFirstName2, #inputLastName2, #inputPhone2");
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var text = $(input).siblings(".error-text").text();
    if (text === "Please fill out this field") {
      $(input).siblings(".error-text").css("visibility", "hidden");
    }
  }
}
// clean "Please check this box if you want to proceed" error for checkboxes; used on start of submit event to avoid repeat of error for few input field after each submit event; help to process validation step by step 
function clearErrorCheckbox() {
  var checkboxes = document.querySelectorAll("#licenseAgreement2");
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    var text = $(checkbox).parent().siblings(".error-text").text();
    if (text === "Please check this box if you want to proceed") {
      $(checkbox).parent().siblings(".error-text").css("visibility", "hidden");
    }
  }
}

// launch validation on submit event
var jsForm = document.getElementsByClassName('jsform')[0];
jsForm.onsubmit = function (e) {
  var formIsValid = true;
  clearErrorEmptyInput();
  clearErrorCheckbox();
  if (InputsOK() === false || CheckboxesOK() === false) {
    formIsValid = false;
  }
  if (!formIsValid) {
    (e).preventDefault();
  } else {
    alert("Form was successfully submitted!");
  }
};
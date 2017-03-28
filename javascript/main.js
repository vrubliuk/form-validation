window.onload = function () {
  ChangeValue();
};
// Since placeholder-shown pseudo class doesn't work in IE and Edge, the value of each input will be changed dynamically via JS
function ChangeValue() {
  var x = document.querySelectorAll("#exampleInputLogin1, #exampleInputEmail1, #exampleInputPassword1, #exampleInputConfirmPassword1, #exampleInputFirstName1, #exampleInputLastName1, #exampleInputPhone1, #month1, #day1, #year1");
  for (var i = 0; x.length; i++ ) {
    x[i].onchange = function () {this.setAttribute('value', this.value);};
  } 
}




document.getElementById("click").onclick = function () {
  var x = document.getElementById("exampleInputLogin1").value;
  alert (x);
};
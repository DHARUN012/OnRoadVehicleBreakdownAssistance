//var
let logoutlink = document.getElementById("logout");
var curUser = null;

//functions
function getUsername() {
  curUser = JSON.parse(localStorage.getItem("user"));
}
function logout() {
  localStorage.removeItem("user");
  window.location = "../userLogin.html";
}

//windows loads

window.onload = function () {
  getUsername();
  if (curUser == null) {
    logoutlink.innerText = "Login";
    logoutlink.href = "../userLogin.html";
  } else {
    var uname = curUser.username;
    console.log(uname);
    logoutlink.href = "javascript:logout()";
  }
};

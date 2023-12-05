// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg3FkW41gWX3QcEb9nwjn8YArO8WNhWOw",
  authDomain: "login-orba.firebaseapp.com",
  databaseURL: "https://login-orba-default-rtdb.firebaseio.com",
  projectId: "login-orba",
  storageBucket: "login-orba.appspot.com",
  messagingSenderId: "581179931707",
  appId: "1:581179931707:web:e50ce751366ac3bc03701e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
//vars
const UserName = document.getElementById("loginname");
const Pass = document.getElementById("loginpassw");
const loginbtn = document.getElementById("logbtn");
console.log(Pass);

//Authentication

function Authentication() {
  const dbRef = ref(db);
  get(child(dbRef, "Userlist/" + UserName.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbPass = decrypt(snapshot.val().Password);
      if (dbPass == Pass.value) {
        login(snapshot.val());
      } else {
        alert("user don't exist");
      }
    } else {
      alert("username or password incorrect");
    }
  });
}

//encryption
function decrypt(dbPass) {
  var pass12 = CryptoJS.AES.decrypt(dbPass, Pass.value);
  return pass12.toString(CryptoJS.enc.Utf8);
}
// login

function login(user) {
  localStorage.setItem("user", user);
  localStorage.setItem("user", JSON.stringify(user));
  window.location = "customerHome.html";
}

// Events
loginbtn.addEventListener("click", Authentication);

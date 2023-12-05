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
const UserName = document.getElementById("name");
const Number = document.getElementById("number");
const Email = document.getElementById("email");
const Password = document.getElementById("password");
const Siginbtn = document.getElementById("registerbtn");
//validation

function isEmpty(str) {
  return str === null || str.match(/^ *$/) !== null;
}
function validation() {
  let email =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let userregex = /^[a-zA-z|0-9]+$/;
  let phonenoregex = /^[0-9]{10,10}$/;

  if (
    isEmpty(UserName.value) ||
    isEmpty(Number.value) ||
    isEmpty(Email.value) ||
    isEmpty(Password.value)
  ) {
    alert("Filling every box");
    return false;
  }
  if (!userregex.test(UserName.value)) {
    alert("The name should only contain alphabets and number");
    return false;
  }
  if (!phonenoregex.test(Number.value)) {
    alert("The name should only 10 digits number");
    return false;
  }
  if (!email.test(Email.value)) {
    alert("Not a valid email");
    return false;
  }
  return true;
}

//register user to db
function registerDb() {
  if (!validation()) {
    console.log("hello");
    return;
  }
  const dbRef = ref(db);
  get(child(dbRef, "Userlist/" + UserName.value)).then((snapshot) => {
    if (snapshot.exists()) {
      alert("Account already exits");
    } else {
      set(ref(db, "Userlist/" + UserName.value), {
        username: UserName.value,
        email: Email.value,
        phoneno: Number.value,
        Password: encrypt(),
      })
        .then(() => {
          alert("user sigin successfull");
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    }
  });
}
//encryption
function encrypt() {
  var pass12 = CryptoJS.AES.encrypt(Password.value, Password.value);
  return pass12.toString();
}

// Events
Siginbtn.addEventListener("click", registerDb);

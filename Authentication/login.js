import { loginFunction } from "./firebase.js";

let email = document.querySelector('#email');
let password = document.querySelector('#password');
let loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', () => {
    console.log(`login btn is clicked`);
    loginFunction(email.value, password.value)
})
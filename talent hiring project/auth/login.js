import { loginUserFunc } from "../firebase.js";

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const validateheading = document.querySelector('#validateheading');
const validateSign = document.querySelector('.validateSign');
const validatemessage = document.querySelector('#validatemessage');
const clarityModal = document.querySelector('.clarityModal');
const modalCrossBtn = document.querySelector('.modalCrossBtn');

loginBtn.addEventListener('click', async () => {

    if (!email.value || !password.value) {
        return validateLogin('empty');
    }
    let result = await loginUserFunc(email.value, password.value);
    console.log(result, '==>> result function')

    if (result.success) {
        clarityModal.style.display = 'flex';
    } else {
        validateLogin();
    }
})

function validateLogin(res) {
    clarityModal.style.display = 'flex';
    validateheading.innerText = `Login Failed!`
    validateSign.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: rgb(207, 49, 49);"></i>`;
    validatemessage.innerText = `Please ensure email and password should be registered!`;
    if (res === 'empty')
        validatemessage.innerText = `All fields must be filled!`;

}

modalCrossBtn.addEventListener('click', () => {
    clarityModal.style.display = 'none';
})
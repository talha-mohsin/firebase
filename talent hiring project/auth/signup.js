import { signupUserFunc } from "../firebase.js";

const signupBtn = document.querySelector('#signup');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const clarityModal = document.querySelector('.clarityModal');
const validateheading = document.querySelector('#validateheading');
const validateSign = document.querySelector('.validateSign');
const validatemessage = document.querySelector('#validatemessage');
const modalCrossBtn = document.querySelector('.modalCrossBtn');


function validationCheck(message) {
    console.log(message, '==>> message')
    if (message.success) {
        clarityModal.style.display = 'flex';
        return;
    } else {
        validateheading.innerText = `Sign up Fail!`;
        validateSign.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: rgb(207, 49, 49);"></i>`;
        validatemessage.innerText = ``;
        switch (message.errorCode) {
            case 'auth/email-already-in-use':
                validatemessage.innerText = `Email already in use!`;
                break;
            case 'auth/invalid-email':
                validatemessage.innerText = `Please enter your valid email!`;
                break;
            case 'auth/weak-password':
                validatemessage.innerText = `Password should be 6 digits long!`;
                break;
            default:
                validatemessage.innerText = `Please checkout wisely your detail has some problem!`;
        }
        clarityModal.style.display = 'flex';
    }
}

signupBtn.addEventListener('click', async () => {
    const regex = /^[a-zA-Z]+$/;

    if (!email.value || !password.value) {
        validateheading.innerText = `Email or password is missing!`;
        validateSign.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: rgb(207, 49, 49);"></i>`;
        validatemessage.innerText = `Your email or password is missing. Please checkout wisely.`;
        clarityModal.style.display = 'flex';
        return;
    }

    if (!userName.value || userName.value.length < 3 || !regex.test(userName.value)) {
        validateheading.innerText = `User name rejected!`;
        validateSign.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: rgb(207, 49, 49);"></i>`;
        validatemessage.innerText = `User name is missing or shorter or number. Please ensure it must be valid and atleast 3 characters long!`;
        clarityModal.style.display = 'flex';
        return;
    }

    let result = await signupUserFunc(email.value, password.value);
    console.log(result)
    validationCheck(result)
})

modalCrossBtn.addEventListener('click', () => {
    clarityModal.style.display = 'none';
})
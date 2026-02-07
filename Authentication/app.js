import { signupFunction, getSingleUserDetail, getAllUserDetails, toGetLoggedInUser } from "./firebase.js";

toGetLoggedInUser()

let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let userName = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let signupBtn = document.querySelector('#signup');
let getSingleData = document.querySelector('#getSingleData');
let getAllData = document.querySelector('#getAllData');

signupBtn.addEventListener('click', () => {
    console.log(`signup btn is clicked`);

    if (!firstName.value || !lastName.value || !userName.value || !email.value || !password.value) {
        return alert(`All fields must be filled!`);
    }

    signupFunction(firstName.value, lastName.value, userName.value, email.value, password.value);


    // let isDone = signupFunction(.......)
    // console.log(isDone);

    // if(isDone === 'saved') {
    //     document.querySelector('.joining').style.display = 'flex'
    //     document.querySelector('.form-container').style.opacity = 0.05
    // } else {
    //     document.querySelector('#emailCheck').innerText = `This email is already exist!`;
    // }
})

getSingleData.addEventListener('click', () => {
    console.log(`getSingleData btn is clicked`);

    getSingleUserDetail('1h0QqhwuaCOfknfHsu6QDcVroq62');
})

getAllData.addEventListener('click', () => {
    console.log(`getAllData btn is clicked`);

    getAllUserDetails();
})
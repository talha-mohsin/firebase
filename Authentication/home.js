import { getAllUserDetails, logoutUser, toGetLoggedInUser, updateUserData, deleteUser } from "./firebase.js";

toGetLoggedInUser()

const body = document.body;
const logout = document.querySelector('#logout');
const profileImg = document.querySelector('#profileImg');
const profileName = document.querySelector('#profileName');
const profileDes = document.querySelector('#profileDes');
const email = document.querySelector('#email');
let selectedUser;

logout.addEventListener('click', () => logoutUser());

try {
    var userData = await getAllUserDetails();
} catch (error) {
    console.log(error);
}

const userDataHTML = userData.map(user => {
    return `<div class="card">
            <img src="${user.profileImg || `https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png`}" class="card-img-top userImg" alt="...">
            <div class="card-body">
                <h5 class="card-title">${user.userName}</h5>
                <p class="card-text">${user.profileDes || `No description provided`}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${user.email}</li>
                <li class="list-group-item">${user.userName}</li>
            </ul>
            <div class="card-body">
                <a href="#" id="${user.id}" class="card-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Update User</a>
                <a href="#" id="${user.id}" class="card-link">Delete User</a>
            </div>
        </div>`
})

document.querySelector('.mainContainer').innerHTML = userDataHTML.join('')

body.addEventListener('click', e => {

    if (e.target.innerText !== 'Update User' && e.target.innerText !== 'Delete User') {
        return;
    }

    selectedUser = userData.find(user => user.id === e.target.id);

    if (e.target.innerText === 'Update User') {
        console.log(e.target.innerText, "==>> event in Update User block")
        console.log(selectedUser, '=>> selectedUser')

        profileImg.value = selectedUser?.profileImg || 'No image provided'
        profileName.value = selectedUser?.userName || 'No profile name provided'
        profileDes.value = selectedUser?.profileDes || 'No Description provided'
        email.value = selectedUser?.email || 'No email provided'
    } else {

        console.log(e.target.innerText, "==>> event in Delete User block")
        console.log(selectedUser, '=>> selectedUser')
        deleteUser(selectedUser.id, 'users')
    }
})

document.querySelector('#saveChangesBtn').addEventListener('click', async () => {

    selectedUser.profileImg = profileImg.value
    selectedUser.userName = profileName.value
    selectedUser.profileDes = profileDes.value
    selectedUser.email = email.value

    await updateUserData(selectedUser, selectedUser.id, "users");

    window.location.reload();
})
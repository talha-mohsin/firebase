import { handleProtectedAction, logoutUser, toGetloggedinUser } from "./firebase.js"

let user = await toGetloggedinUser();

const jobPostBtn = document.querySelector('#jobPostBtn')
const jobfindBtn = document.querySelector('#jobfindBtn')
const logout = document.querySelector('#logout');
const clarityModal = document.querySelector('.clarityModal')
const sidebar = document.querySelector('.sidebar')
const sidebarClose = document.querySelector('#sidebarClose')
const loginBtn = document.querySelector('#loginBtn')
const userDP = document.querySelector('.userDP')
const userName = document.querySelector('.userName')
const email = document.querySelector('.email')
const profileImg = document.querySelector('.profileImg')

// userDP.innerHTML = user.email[0].toUpperCase();

jobPostBtn.addEventListener('click', () => {
    handleProtectedAction('./profiles/profile.html')
    jobModalBg.style.display = 'flex'

})

jobfindBtn.addEventListener('click', () => {
    handleProtectedAction('./job/job.html')
})




logout.addEventListener('click', () => {
    logoutUser()
    logout.disabled = true;
    clarityModal.style.display = 'flex';
    setTimeout(() => {
        clarityModal.style.display = 'none';
    }, 2000);
})

loginBtn.addEventListener('click', () => {
    logout.disabled = false;
})

sidebarClose.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

userDP.addEventListener('click', () => {

    if (!user) {
        return console.log(`You are not register!`)
    }

    sidebar.style.display = 'flex';
    userName.innerText = user.email.split('@')[0] || 'No username provided';
    email.innerText = user.email || 'No email provided';
})
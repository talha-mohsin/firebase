import { uploadImg } from "../cloudinary.js";
import { getjobsFunc, logoutUser, requireAuth, setDataFunc, toGetloggedinUser } from "../firebase.js";

// toGetloggedinUser();
requireAuth().then((user) => {
    console.log('Authorized:', user.email);
});


let jobCards = document.querySelector('.jobCards');
// let logout = document.querySelector('#logout');
let jobsDB;

try {
    jobsDB = await getjobsFunc('jobs');
    console.log(jobsDB);

} catch (error) {

    jobsDB = null;
    console.log(error, 'Error is happening in fetching job data!')
}


function jobCardsView() {

    let jobsHTML = jobsDB.map(job => {
        return `<div class="jobCard">
            <div class="jobCardHead">
                <div class="jobCardHeadLeft">
                    <div class="company">
                        <i class="fa-solid fa-building jobCardIcons"></i>
                        <p class="companyName">${job.companyName}</p>
                    </div>
                    <div class="designation">
                        <i class="fa-solid fa-user jobCardIcons"></i>
                        <p class="designationName">${job.jobTitle}</p>
                    </div>
                    <div class="salary">
                        <i class="fa-solid fa-coins jobCardIcons"></i>
                        <p class="salaryAmount">${job.jobSalary}</p>
                    </div>
                    <div class="located">
                        <i class="fa-solid fa-location-dot jobCardIcons"></i>
                        <p class="location">${job.jobLocation}</p>
                    </div>
                </div>
                <div class="jobCardHeadRight">
                        <i class="fa-solid fa-ellipsis jobCardDots"></i>
                        <div class="jobCardTooltip">
                            <button id="jobCardEdit">Edit</button>
                            <hr>
                            <button id="jobCardRemove">Delete</button>
                        </div>
                    <div class="jobCardLogo">
                        <img src="../assets/logo.png" alt="">
                    </div>
                </div>
            </div>
            <div class="jobCardFoot">
                <div class="jobCardFootLeft">
                    <div class="views">
                        <i class="fa-solid fa-eye jobCardIcons"></i>
                        <span id="viewCount">5</span> views
                    </div>
                    <div class="posted">
                        <span>Posted by:</span>
                        <div class="postedBy">${job.postedBy}</div>
                    </div>
                </div>
                <div class="jobCardFootRight">
                    <div class="applied">
                        <span>Applied by: </span>
                        <span id="applyNo">15</span>
                    </div>
                </div>
            </div>
        </div>`
    })
    jobCards.innerHTML = jobsHTML.join('');

}
jobCardsView();

const jobCardDots = document.querySelectorAll('.jobCardDots');
const jobCardsEdit = document.querySelectorAll('#jobCardEdit');
const jobCardsRemove = document.querySelectorAll('#jobCardRemove');

jobCardDots.forEach(jobCardDot => {
    jobCardDot.addEventListener('mouseover', (e) => {
        e.target.nextElementSibling.style.display = 'block';
        e.target.nextElementSibling.addEventListener('mouseleave', (e) => {
            e.target.style.display = 'none';
        });
    });
});


jobCardsEdit.forEach((jobCardEdit, i) => {
    jobCardEdit.addEventListener('click', (e) => {
        console.log(e.target, i); //PERFECT -> NOW MOVE ON TO FIREBASE ----->>>>>
    })
})



jobCardsRemove.forEach((jobCardRemove, i) => {
    jobCardRemove.addEventListener('click', (e) => {
        console.log(e.target, i); //PERFECT -> NOW MOVE ON TO FIREBASE ----->>>>>
    })
})

// NAVBAR LOGOUT FUNCTIONALITY
// logout.addEventListener('click', () => {
//     console.log('logout btn is clicked!');
//     logoutUser();
// })

// INPUT MODAL LOGICS
const inputModalBg = document.querySelector('.inputModalBg')
const employeeName = document.querySelector('#employeeName');
const employeeEmail = document.querySelector('#employeeEmail');
const employeeExperience = document.querySelector('#employeeExperience');
const aboutEmployee = document.querySelector('#aboutEmployee');
const employeeImg = document.querySelector('#employeeImg');
const addedBtn = document.querySelector('#addedBtn');

// profile details object constructor By using OOP
class profileObjConstructor {
    constructor(employeeName, employeeEmail, employeeExperience, aboutEmployee, emplImgUrl) {
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
        this.employeeExperience = employeeExperience;
        this.aboutEmployee = aboutEmployee;
        this.emplImgUrl = emplImgUrl;
        // this.time = 
    }
}
    // console.log(new Date().toISOString());


addedBtn.addEventListener('click', async () => {

    if (!employeeName.value || !employeeEmail.value || !employeeExperience.value || !aboutEmployee.value || !employeeImg.files) return alert('All fields must be filled!')
    console.log(employeeImg.files[0])

    // cloudinary logic
    const formData = new FormData();
    formData.append('file', employeeImg.files[0]);
    formData.append('upload_preset', 'projects');

    let emplImgUrl = await uploadImg(formData);
    console.log(emplImgUrl, '==>> emplImgUrl');

    const obj = new profileObjConstructor(employeeName.value, employeeEmail.value, employeeExperience.value, aboutEmployee.value, emplImgUrl)
    const profileObj = { ...obj }
    console.log(profileObj)


    setDataFunc("profiles", profileObj);
    employeeName.value = '';
    employeeEmail.value = '';
    employeeExperience.value = '';
    aboutEmployee.value = '';
    employeeImg.files = '';

    window.location = './profiles/profile.html';
})

document.querySelector('.inputModalClose').addEventListener('click', () => {
    inputModalBg.style.display = 'none';
})

// END PROFILE MODAL LOGICS
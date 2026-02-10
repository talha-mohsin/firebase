import { requireAuth, setDataFunc, toGetloggedinUser } from "../firebase.js";

// toGetloggedinUser();
requireAuth().then((user) => {
  console.log('Authorized:', user.email);
});

// INPUT MODAL LOGICS
const inputModalBg = document.querySelector('.inputModalBg')
const jobTitle = document.querySelector('#jobTitle');
const jobSalary = document.querySelector('#jobSalary');
const jobLocation = document.querySelector('#jobLocation');
const companyName = document.querySelector('#companyName');
const postedBy = document.querySelector('#postedBy');
const jobPublish = document.querySelector('#jobPublish');

// job details object constructor By using OOP
class JobObjConstructor {
    constructor(jobTitle, jobSalary, jobLocation, companyName, postedBy) {
        this.jobTitle = jobTitle;
        this.jobSalary = jobSalary;
        this.jobLocation = jobLocation;
        this.companyName = companyName;
        this.postedBy = postedBy;
        // this.time = 
    }
}


jobPublish.addEventListener('click', () => {

    if (!jobTitle.value || !jobSalary.value || !jobLocation.value || !companyName.value || !postedBy.value) return alert('All fields must be filled!')

    // console.log(new Date().toISOString());

    const obj = new JobObjConstructor(jobTitle.value, jobSalary.value, jobLocation.value, companyName.value, postedBy.value)
    const jobObj = { ...obj }

    setDataFunc("jobs", jobObj);
    jobTitle.value = '';
    jobSalary.value = '';
    jobLocation.value = '';
    companyName.value = '';
    postedBy.value = '';

    window.location = './profiles/profile.html';
})

document.querySelector('.inputModalClose').addEventListener('click', () => {
    inputModalBg.style.display = 'none';
})

// END JOB MODAL LOGICS
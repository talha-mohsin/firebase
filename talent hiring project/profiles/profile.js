import { getDataFunc, requireAuth, setDataFunc, toGetloggedinUser } from "../firebase.js";

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

async function cardsUI() {
  let profilesData = await getDataFunc("profiles")
  console.log(profilesData, '=>> profileData');

  let profileHTML = profilesData.map(profile => {
    employeeName, employeeEmail, employeeExperience, aboutEmployee, emplImgUrl
    // return `<div class="talent-card">
    //     <div class="talent-img">
    //       <img src="${profile.emplImgUrl}" alt="Talent" />
    //     </div>
    //     <h3 class="talent-name">${profile.employeeName}</h3>
    //     <p class="talent-role">${}</p>
    //     <div class="talent-skills">
    //       <span class="skill">HTML</span>
    //       <span class="skill">CSS</span>
    //       <span class="skill">JavaScript</span>
    //       <span class="skill">React</span>
    //     </div>
    //     <div class="talent-actions">
    //       <button class="view-btn">View Profile</button>
    //       <button class="hire-btn">Hire</button>
    //     </div>
    //   </div>`
  })

    
}

// cardsUI();

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
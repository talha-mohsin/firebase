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
  let profilesData = await getDataFunc("profiles");
  console.log(profilesData, '=>> profileData');

  let profileHTML = profilesData.map((profile, index) => {
    console.log(profile, '=>> profile');

    function foo() {
      let skillUI = profile.skills.map(skill => {
        return `<span class="skill">${skill}</span>`
      });

      return skillUI.join(' ');
    }

    return `<div class="talent-card">
        <div class="talent-img">
          <img src="${profile.image}" alt="Talent" />
        </div>
        <h3 class="talent-name">${profile.name}</h3>
        <p class="talent-role">${profile.role}</p>
        <div class="talent-skills">
        ${foo()}
        </div>
        <div class="talent-actions">
          <button class="view-btn" data-index="${index}">View Profile</button>
          <button class="hire-btn">Hire</button>
        </div>
      </div>`
  })

  document.querySelector('.talent-grid').innerHTML = profileHTML.join('')
}
cardsUI();

// profile view btn logic

const modalBg = document.getElementById("profileModalBg");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalSkills = document.getElementById("modalSkills");
const modalBio = document.getElementById("modalBio");

document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("view-btn")) {

    const profilesData = await getDataFunc("profiles");
    const index = e.target.dataset.index;
    const profile = profilesData[index];

    modalImg.src = profile.image;
    modalName.textContent = profile.name;
    modalRole.textContent = profile.role;
    modalBio.textContent = profile.bio || "No bio available";

    modalSkills.innerHTML = profile.skills
      .map(skill => `<span>${skill}</span>`)
      .join("");

    modalBg.style.display = "flex";
  }
});

document.querySelector(".profileClose").addEventListener("click", () => {
  modalBg.style.display = "none";
});

modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) {
    modalBg.style.display = "none";
  }
});

// end profile view btn logic

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
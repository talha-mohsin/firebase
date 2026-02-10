import { uploadImg } from "../cloudinary.js";
import { getDataFunc, logoutUser, requireAuth, setDataFunc, toGetloggedinUser } from "../firebase.js";

// toGetloggedinUser();
requireAuth();


let jobCards = document.querySelector('.jobCards');
// let logout = document.querySelector('#logout');
let jobsDB;

try {
    jobsDB = await getDataFunc('jobs');
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
const form = document.getElementById("talentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const talentImg = document.getElementById("talentImg").files[0];
    const talentName = document.getElementById("talentName").value.trim();
    const talentRole = document.getElementById("talentRole").value.trim();
    const talentSkills = document.getElementById("talentSkills").value;
    const talentBio = document.getElementById("talentBio").value.trim();

    if (!talentImg || !talentName || !talentRole || !talentSkills || !talentBio) {
        return alert("All fields are required");
    }

    try {
        /* 1 Upload image to Cloudinary */
        const formData = new FormData();
        formData.append("file", talentImg);
        formData.append("upload_preset", "projects");

        const imageURL = await uploadImg(formData);

        /* 2 Convert skills to array */
        const skillsArray = talentSkills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

        /* 3 Create profile object */
        const profileData = {
            name: talentName,
            role: talentRole,
            skills: skillsArray,
            bio: talentBio,
            image: imageURL,
            createdAt: new Date().toISOString()
        };
        
        console.log(profileData, '==>> profileData');

        /* 4 Save to Firestore */ 
        await setDataFunc("profiles", profileData);

        alert("Profile saved successfully!");
        form.reset();

    } catch (error) {
        console.error("Profile save error:", error);
        alert("Something went wrong");
    }
});

document.querySelector('.crossBtn').addEventListener('click', () => {
    document.querySelector('.talentFormBg').style.display = 'none';
})

// END PROFILE MODAL LOGICS
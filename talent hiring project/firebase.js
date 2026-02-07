// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE9lwvMGo4LjcijDifH67zRAmvbsKkdAQ",
    authDomain: "talenthiring-79225.firebaseapp.com",
    projectId: "talenthiring-79225",
    storageBucket: "talenthiring-79225.firebasestorage.app",
    messagingSenderId: "547848494979",
    appId: "1:547848494979:web:43b2980b6bcaa54d46a0b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// <<<<<<<<< ----------- SIGN UP USER ----------- >>>>>>>>>
async function signupUserFunc(email, password) {

    try {

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user;
        setTimeout(function () {
            window.location = 'login.html';
        }, 1000)
        return { success: true, user: user };

    } catch (error) {

        return { success: false, errorCode: error.code, errMessage: error.message }

    }

}


// <<<<<<<<< ----------- LOG IN USER ----------- >>>>>>>>>
async function loginUserFunc(email, password) {

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Signed in 
        const user = userCredential.user;
        setTimeout(function () {
            window.location = '../index.html';
        }, 1000);
        return { success: true }
    } catch (error) {
        return { success: false, errorCode: error.code, errorMessage: error.message }
    }

}


// <<<<<<<<< ----------- To Get LOGGED IN USER ----------- >>>>>>>>>
function toGetloggedinUser() {

    return new Promise((resolve, reject) => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {

            if (user) {
                resolve(user);
                const uid = user.uid;
                console.log(user.email, '==>> loggedin User Email');
                console.log(uid, '==>> loggedin user ID');

                // window.location = './job.html' || '../index.html'
                // if(window.location == '../index.html')
            } else {
                // User is signed out
                // ...
                // window.location = '../login.html';
                // reject('login required!');
            }
        });
    })
}


// <<<<<<<<<<<---------- Reuseable functions for verfication --------->>>>>>>>>>>
// Functionality for job and talent pages
function requireAuth(redirectTo = '../auth/login.html') {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location = redirectTo;
            } else {
                resolve(user);
            }
        });
    });
}

// Functionality for landing page
function handleProtectedAction(destination) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location = './auth/login.html'
    } else {
      window.location = destination;
    }
  });
}
// <<<<<<<<<<<---------- END Reuseable functions for verfication --------->>>>>>>>>>>



// <<<<<<<<<<<---------- Logout to current user --------->>>>>>>>>>>
function logoutUser() {

    const auth = getAuth();
    signOut(auth).then(() => {
        console.log(`Sign-out successful.`)

        if (window.location.pathname.includes('/job' || 'profile')) {
            return window.location = '../auth/login.html';
        }

    }).catch((error) => {
        console.log(error, '==>> Error happening in Signing out!');
    });

}


// <<<<<<<<<<<---------- Set a single job data --------->>>>>>>>>>>
async function setjobFunc(bucket, jobObj) {
    let jobId = crypto.randomUUID();

    console.log(bucket, '==>> bucket');
    console.log(jobObj, '==>> jobObj');
    try {
        // Add a new document in collection "cities"
        await setDoc(doc(db, bucket, jobId), jobObj);
        console.log('data store successfully!');
    } catch (error) {
        console.log(`${error} =>> error is happening!`);
    }

}


// <<<<<<<<<<<---------- Get jobs data --------->>>>>>>>>>>
async function getjobsFunc(bucket) {

    try {

        const jobsArr = [];
        const q = query(collection(db, bucket));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            jobsArr.push({ ...doc.data(), id: doc.id });
        });
        return jobsArr;

    } catch (error) {
        console.log(error, '==>>> Error is happening for get jobs!!!')
    }


}

export { signupUserFunc, loginUserFunc, toGetloggedinUser, requireAuth, handleProtectedAction, logoutUser, setjobFunc, getjobsFunc } 
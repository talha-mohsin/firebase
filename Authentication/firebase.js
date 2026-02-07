import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// Import from firebase Authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Import from fireStore Database
import { doc, setDoc, getDoc, collection, query, where, getDocs, getFirestore, deleteDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBurfEH8Xj_9Bcku8hR5LqwT7dCvlrqGSQ",
    authDomain: "first-firebase-project-33cc6.firebaseapp.com",
    projectId: "first-firebase-project-33cc6",
    storageBucket: "first-firebase-project-33cc6.firebasestorage.app",
    messagingSenderId: "402545896204",
    appId: "1:402545896204:web:e89d49c98efb7bd11ef729"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// <<<<<<-------- Sign up new users -------->>>>>>
function signupFunction(firstName, lastName, userName, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            console.log(`Signed up successfully`)
            const user = userCredential.user;
            // ...

            // Add a new document in collection "users" of DB
            setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
            })
                .then(() => {
                    console.log(`Record saved in Database`);
                }).catch((err) => {
                    console.log(`${err} -->> Record have error in Database`)
                })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error code of Signup process -->> `, errorCode)
            console.log(`Error message of Signup process -->> `, errorMessage)

            // ..
        });
}


// <<<<<<-------- Login in existing users -------->>>>>>
function loginFunction(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user, 'Signin successfully!')
            window.location = 'home.html'
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Signin Error!`, errorCode)
            console.log(`Signin Error!`, errorMessage)
        });
}


// <<<<<<-------- Get the currently Logged in user -------->>>>>>
function toGetLoggedInUser() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {

        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;

            if (window.location.pathname !== '/Authentication/home.html') {
                window.location = './home.html';
            }
            // ...
        } else {
            // User is signed out

            console.log(`User is not log in their account`)

            if (window.location.pathname == '/Authentication/index.html' || window.location.pathname == '/Authentication/login.html') {
                console.log(`I am already at signup or login page and no need to go another page!`);
            } else {
                window.location = './login.html'
            }
            // ...
        }
    });
}


// <<<<<<-------- logout user -------->>>>>>
function logoutUser() {

    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = 'login.html';

    }).catch((error) => {
        // An error happened.   
    });
}


// <<<<<<-------- Get single user details -------->>>>>>
async function getSingleUserDetail(uniqueId) {

    const docRef = doc(db, "users", uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


// <<<<<<-------- Get All user details -------->>>>>>
async function getAllUserDetails() {

    let usersArr = [];
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        usersArr.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return usersArr;
}


// <<<<<<-------- Update user data -------->>>>>>
async function updateUserData(userDetails, uid, collection) {

    try {
        await setDoc(doc(db, collection, uid), userDetails)
    } catch (error) {
        console.log(error, "error is coming!")
    }

}


// <<<<<<-------- Delete user -------->>>>>>
async function deleteUser(uid, collection) {
    await deleteDoc(doc(db, collection, uid));
    window.location.reload();
}

export { signupFunction, loginFunction, getSingleUserDetail, getAllUserDetails, toGetLoggedInUser, logoutUser, updateUserData, deleteUser }
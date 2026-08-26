import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ===============================
// FIREBASE CONFIGURATION
// ===============================

const firebaseConfig = {

    apiKey: "AIzaSyAszr1WYiRJpfsEb2TWRJC-qLu0x8EKSG4",

    authDomain: "netflix-73462.firebaseapp.com",

    databaseURL:
        "https://netflix-73462-default-rtdb.firebaseio.com",

    projectId: "netflix-73462",

    storageBucket:
        "netflix-73462.firebasestorage.app",

    messagingSenderId: "792766913323",

    appId:
        "1:792766913323:web:4b92e97f8de20b1040436e"

};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);


// Firebase Authentication
const auth = getAuth(app);


// Realtime Database
const database = getDatabase(app);


// ===============================
// GET HTML ELEMENTS
// ===============================

const signupBox =
    document.getElementById("signupBox");

const loginBox =
    document.getElementById("loginBox");

const dashboard =
    document.getElementById("dashboard");

const userEmail =
    document.getElementById("userEmail");


// ===============================
// SIGN UP
// ===============================

// ===============================
// SIGN UP
// ===============================

const signupBtn =
    document.getElementById("signupBtn");


signupBtn.addEventListener("click", async () => {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;


    // Check empty fields

    if (name === "" || email === "" || password === "") {

        document.getElementById("signupMessage").innerText =
            "Please fill all fields.";

        return;
    }


    try {

        // Create Firebase Authentication account

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = userCredential.user;


        // Save user information in Realtime Database

        await set(
            ref(database, "users/" + user.uid),
            {
                name: name,
                email: email
            }
        );


        // Redirect to Home Page

        window.location.href = "homepage.html";


    } catch (error) {

        console.error(error);

        document.getElementById("signupMessage").innerText =
            error.message;

    }

});


// ===============================
// SIGN IN
// ===============================

const loginBtn =
    document.getElementById("loginBtn");


loginBtn.addEventListener("click", async () => {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    // Check empty fields

    if (email === "" || password === "") {

        document.getElementById("loginMessage").innerText =
            "Please enter email and password.";

        return;
    }


    try {

        // Sign in using Firebase Authentication

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "homepage.html";

    } catch (error) {

        console.error(error);


        // User-friendly error messages

        if (error.code === "auth/invalid-credential") {

            document.getElementById("loginMessage").innerText =
                "Invalid email or password.";

        }

        else if (error.code === "auth/user-not-found") {

            document.getElementById("loginMessage").innerText =
                "User does not exist.";

        }

        else {

            document.getElementById("loginMessage").innerText =
                error.message;

        }

    }

});


// ===============================
// SIGN OUT
// ===============================

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        console.log("User signed out.");

    } catch (error) {

        console.error(error);

    }

});


// ===============================
// CHECK LOGIN STATE
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user) {

        // =========================
        // USER IS LOGGED IN
        // =========================

        signupBox.style.display = "none";

        loginBox.style.display = "none";

        dashboard.style.display = "block";


        userEmail.innerText =
            "Logged in as: " + user.email;

    }

    else {

        // =========================
        // USER IS LOGGED OUT
        // =========================

        signupBox.style.display = "block";

        loginBox.style.display = "none";

        dashboard.style.display = "none";

    }

});


// ===============================
// SHOW SIGN IN
// ===============================

document.getElementById("showLogin")
    .addEventListener("click", () => {

        signupBox.style.display = "none";

        loginBox.style.display = "block";

    });


// ===============================
// SHOW SIGN UP
// ===============================

document.getElementById("showSignup")
    .addEventListener("click", () => {

        loginBox.style.display = "none";

        signupBox.style.display = "block";

    });

// ============================
// SHOW ABOUT
// ============================

const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", () => {
    window.location.href = "optionabout.html";
});

// ============================
// SHOW CONTACT
// ============================

const contactBtn = document.getElementById("contactBtn");
contactBtn.addEventListener("click", () => {
    window.location.href = "optioncontact.html";
});
// ============================
// SHOW HOMEPAGE
// ============================
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {
    window.location.href = "homepage.html";
});


// ============================
// SHOW GET STARTED
// ============================
const getStartedBtn = document.getElementById("startBtn1");

 document.getElementById("startBtn1").addEventListener("click", () => {
            window.location.href = "optiongetstarted.html";
        })

alert("Welcome to StudyHub");
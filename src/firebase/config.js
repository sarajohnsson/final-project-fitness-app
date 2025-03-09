// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCiSXIbGys00k7wRHEHm5iFAwqCCH9-z8I',
    authDomain: 'final-project-fitness-app.firebaseapp.com',
    projectId: 'final-project-fitness-app',
    storageBucket: 'final-project-fitness-app.firebasestorage.app',
    messagingSenderId: '464655800294',
    appId: '1:464655800294:web:4c08334e123b5771052827',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

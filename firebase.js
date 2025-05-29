// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyAvJqq0ZPhjBMOL0n2fOmUJBZERgGa9x8A",
  authDomain: "netflix-clone-72550.firebaseapp.com",
  projectId: "netflix-clone-72550",
  storageBucket: "netflix-clone-72550.firebasestorage.app",
  messagingSenderId: "455705623035",
  appId: "1:455705623035:web:b6e3501ee892526c8d735e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return user;
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")) // Throw error to handle in component
    }
}

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        return user;
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); // Throw error to handle in component
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}

export { auth, db, signup, login, logout };


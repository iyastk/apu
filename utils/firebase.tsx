// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFxxiiFbwFuHbrpIyB8mmLyiKqFFcvPT8",
  authDomain: "apu-store-e2ffc.firebaseapp.com",
  projectId: "apu-store-e2ffc",
  storageBucket: "apu-store-e2ffc.appspot.com",
  messagingSenderId: "161075283924",
  appId: "1:161075283924:web:5d0d9cab3f145cd93ab841",
};
const app = initializeApp(firebaseConfig);

const FacebookProvider = new FacebookAuthProvider();
FacebookProvider.setCustomParameters({
  display: "popup",
});

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopUp = () =>
  signInWithPopup(auth, FacebookProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation: any = null
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error: any) {
      console.log("error in user creating", error.message);
    }
  }
  // return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutAuthUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// add product details into filestore
export const AddProductDetails = async (
  currentUser: any,
  additionalInformation: any = null,
  imageUrl: string | undefined
) => {
  const productDocRef = doc(db, `Products/${v4()}`);
  console.log(productDocRef);
  const productSnapShot = await getDoc(productDocRef);
  if (!productSnapShot.exists()) {
    const createdAt = new Date();
    // const createdBy = currentUser;
    console.log("entered here");
    try {
      await setDoc(productDocRef, {
        createdAt,
        // createdBy,
        ...additionalInformation,
        imageUrl,
      });
    } catch (error: any) {
      console.log("error in user creating", error.message);
    }
  }
  // return userDocRef;
};

//image upload

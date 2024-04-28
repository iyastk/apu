import { v4 } from "uuid";

//fire base storage for photo upload
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  listAll,
  list,
} from "firebase/storage";
const storage = getStorage();
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";


export const AddProductDetails = async (
    currentItem: any,
    additionalInformation: any = null
  ) => {
    const itemDocRef = doc(db, `${currentItem}/${v4()}`);
    const productSnapShot = await getDoc(itemDocRef);
    if (!productSnapShot.exists()) {
      const createdAt = new Date();
      // const createdBy = currentUser;
      console.log("entered here");
      try {
        await setDoc(itemDocRef, {
          createdAt,
          ...additionalInformation,
        });
      } catch (error: any) {
        console.log("error in user creating", error.message);
      }
    }
    // return userDocRef;
  };
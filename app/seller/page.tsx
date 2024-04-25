"use client";

import { useState } from "react";
import { AddProductDetails } from "../../utils/firebase";
import FormInput from "@/components/formInput";

//special tbd
import { useContext } from "react";
import { UserContext } from "../../store/UserStore";

//fire base storage for photo upload
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
const storage=getStorage()

const defaultProduct = {
  category: "",
  subCategory: "",
  title: "",
  details: "",
  price: "",
  contactNumber: "",
  // Add other basic input fields here
};

const AddProductForm = () => {
  const { currentUser }: { currentUser: any } = useContext(UserContext);

  const [formData, setFormData] = useState(defaultProduct);
  const { category, subCategory, title, details, price, contactNumber } =
    formData;

  // for image later review
  const [imageUpload, setImageUpload] = useState(null);

  const imagesRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${title}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
      });
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files exists using optional chaining
    const file = event.target.files?.[0];
    // Proceed with your file handling logic here
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetFormField = () => {
    setFormData(defaultProduct);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await AddProductDetails(currentUser, formData);
      resetFormField();
      console.log(response);
      console.log("product added successfully");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use)") {
        alert("Email already exist");
      } else if (error.code === "auth/weak-password") {
        alert("weak password. please include at least six characters");
      }
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto flex min-h-screen flex-col justify-center  items-center gap-3"
      onSubmit={handleSubmit}
    >
      <FormInput
        label={"Category"}
        type="text"
        name="category"
        id="category"
        onChange={handleChange}
        value={category}
      ></FormInput>
      <FormInput
        label={"sub Category"}
        type="text"
        name="subCategory"
        id="subCategory"
        onChange={handleChange}
        value={subCategory}
      ></FormInput>
      <FormInput
        label={"Title"}
        type="text"
        name="title"
        id="title"
        onChange={handleChange}
        value={title}
      ></FormInput>
      <FormInput
        label={"details"}
        type="textarea"
        name="details"
        id="details"
        onChange={handleChange}
        value={details}
      ></FormInput>
      <FormInput
        label={"price"}
        type="text"
        name="price"
        id="price"
        onChange={handleChange}
        value={price}
      ></FormInput>
      <FormInput
        label={"contactNumber"}
        type="text"
        name="contactNumber"
        id="contactNumber"
        onChange={handleChange}
        value={contactNumber}
      ></FormInput>
      {/* Repeat similar code for other input fields */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}> Upload Image</button>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;

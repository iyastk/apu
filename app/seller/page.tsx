"use client";

import { useState } from "react";
import { AddProductDetails } from "../../utils/firebase";
import FormInput from "@/components/formInput";
import SelectComponent from "@/components/selection";

//special tbd
import { useContext, useEffect } from "react";
import { UserContext } from "../../store/UserStore";
import { v4 } from "uuid";

//fire base storage for photo upload
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Link from "next/link";
const storage = getStorage();

const categories = [
  "Clothing",
  "Accessories",
  "Cycles",
  "Sports",
  "Room Decor",
  "Stationary",
  "Bags",
  "Utensils",
  "Footwear",
  "Books",
  "Electronic stuffs",
];
const services = ["Donate", "Rent", "Sell"];

const defaultProduct = {
  category: categories[0],
  title: "",
  details: "",
  price: "",
  contactNumber: "",
  service: services[0],
  // Add other basic input fields here
};

const AddProductForm = () => {
  const { currentUser }: { currentUser: any } = useContext(UserContext);

  const [formData, setFormData] = useState(defaultProduct);
  const { category, title, details, price, contactNumber, service } = formData;

  // for image later review
  const [imageUpload, setImageUpload] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${title}+${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        alert("image uploaded successfully");
      });
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files exists using optional chaining
    const file = event.target.files?.[0];
    // Proceed with your file handling logic here
    if (file) {
      setImageUpload(file);
      console.log("Selected file:", file);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetFormField = () => {
    setFormData(defaultProduct);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("logged her");
    e.preventDefault();
    try {
      const response = await AddProductDetails("Products", formData, imageUrl);
      resetFormField();
      alert("product added successfully");
    } catch (error: any) {
      //check all this error codes : copy pasted
      if (error.code === "auth/email-already-in-use)") {
        alert("Email already exist");
      } else if (error.code === "auth/weak-password") {
        alert("weak password. please include at least six characters");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Link href={"/"}>
        <div>go back</div>
      </Link>
      <form className="max-w-lg mx-auto flex min-h-screen flex-col justify-center  items-center gap-3">
        <SelectComponent
          id="category"
          name="category"
          categories={categories}
          className="border rounded p-2"
          onChange={handleChange}
          value={category}
          label="category"
        ></SelectComponent>

        <FormInput
          label={"Title"}
          type="text"
          name="title"
          id="title"
          className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          onChange={handleChange}
          required
          value={title}
        ></FormInput>
        <FormInput
          label={"details"}
          type="textarea"
          name="details"
          id="details"
          required
          className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          onChange={handleChange}
          value={details}
        ></FormInput>
        <FormInput
          label={"price"}
          type="text"
          name="price"
          id="price"
          className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          onChange={handleChange}
          value={price || 0}
        ></FormInput>
        <FormInput
          label={"contactNumber"}
          type="text"
          name="contactNumber"
          id="contactNumber"
          required
          className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          onChange={handleChange}
          value={contactNumber}
        ></FormInput>

        <SelectComponent
          id="service"
          name="service"
          categories={services}
          className="border rounded p-2"
          onChange={handleChange}
          value={service}
          label="service"
        ></SelectComponent>

        {/* Repeat similar code for other input fields */}
        <input type="file" onChange={handleFileChange} />
        <div onClick={uploadFile}> Upload Image</div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

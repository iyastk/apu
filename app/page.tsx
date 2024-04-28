"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserStore";
import { signOutAuthUser } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Home() {
  const { currentUser }: { currentUser: any } = useContext(UserContext);
  const name = currentUser?.displayName;
  const [data, setData] = useState<any>([]);
  // console.log(currentUser);

  const getData = async () => {
    const dataRef = collection(db, "Products");
    const dataDb = await getDocs(dataRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ul className="flex gap-6 ">
          <li>home</li>
          <li>home</li>
          <li>home</li>
          {currentUser ? (
            <div>
              <div>{name ? name : "Hello"}</div>

              <Link href={"/seller"}> Add new product</Link>
              <Link href={"/signIn"}>
                <li onClick={signOutAuthUser}>sign out </li>
              </Link>
            </div>
          ) : (
            <Link href={"/signIn"}>
              <li>sign in </li>
            </Link>
          )}
        </ul>
      </div>
      {data.map((item: any, i: any) => {
        console.log(item);
        return (
          <div className="card" key={i}>
            <img src={item.imageUrl} alt={item.title} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-category">Category: {item.category}</p>
              <p className="card-price">Price: {item.price}</p>
              <p className="card-details">Details: {item.details}</p>
              <p className="card-contact">Contact: {item.contact}</p>
              <p className="card-type">Type: {item.service}</p>
            </div>
          </div>
        );
      })}
      <footer>this is footer</footer>
    </main>
  );
}

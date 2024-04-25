"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../store/UserStore";
import { signOutAuthUser } from "../utils/firebase";

export default function Home() {
  const { currentUser }: { currentUser: any } = useContext(UserContext);
  const name = currentUser?.displayName;
  console.log(currentUser);
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
      <div className="flex gap-6 p-4">
        <div className="bg-red-300 p-7">items</div>
        <div className="bg-red-300 p-7">items</div>
        <div className="bg-red-300 p-7">items</div>
        <div className="bg-red-300 p-7">items</div>
        <div className="bg-red-300 p-7">items</div>
      </div>
      <footer>this is footer</footer>
    </main>
  );
}

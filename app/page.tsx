import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ul className="flex gap-6 ">
          <li>home</li>
          <li>home</li>
          <li>home</li>
          <Link href={"/signIn"}>
            <li>sign in </li>
          </Link>
          <Link href={"/signUpForm"}>
            <li>sign up </li>
          </Link>
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

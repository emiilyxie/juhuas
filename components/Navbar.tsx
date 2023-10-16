'use client'

import { auth } from "@/lib/firebase";
import { useUserData } from "@/lib/hooks";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Navbar = () => {

  let userData = useUserData()
  let router = useRouter()

  const onLogout = async () => {
    signOut(auth).then(() => {
      router.push("/")
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>

        <li>
          {userData.user ? (
            <div>
              <Link href={`/u/${userData.user.id}`}>Profile</Link>
              <Link href={"/p/new"}>New Post</Link>
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div>
            <Link href="/login">Login</Link>
            <Link href="/u/new">Create Account</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

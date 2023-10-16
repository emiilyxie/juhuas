'use client'

import { UserContext } from "@/lib/contexts";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";


const Navbar = () => {

  let { user, authUser } = useContext(UserContext)
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
          {user ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

'use client'

import React from 'react';
import { useUserData } from '@/lib/hooks';
import Link from "next/link";
import { logOutUser } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import styles from "@/components/Sidebar.module.css"

export default function Sidebar({
  children
} : {
  children: React.ReactNode
}) {

  const router = useRouter()
  let userData  = useUserData()

  const onLogout = async () => {
    logOutUser()
      .then(() => router.push('/'))
      .catch((error) => console.log(error))
  }

  return (
    <div className={styles.main}>
      <div>
        <Link href={"/"}>J U H U A</Link>
      </div>

      <div>{children}</div>

      <div>
        {
          userData.user ? 
            (
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
            )
        }
      </div>
    </div>
  )
}
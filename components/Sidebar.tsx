'use client'

import React from 'react';
import { useUserData } from '@/lib/hooks';
import Link from "next/link";
import { logOutUser } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import styles from "@/components/Sidebar.module.css"
import { PrimaryButton, PrimaryOutlineButton, SecondaryButton } from './formElements/FormButton';

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
    <div className={styles.sidebar}>
      <div>
        <Link href={"/"} className={styles.logo}>Crysanthenums</Link>
        <div>{children}</div>
      </div>

      {
        userData.user ? 
          (
            <div className={styles.second}>
              <Link href={"/p/new"}><PrimaryButton label='New Post' onSubmit={() => {}} valid={true} /></Link>
              <Link href={`/u/${userData.user.id}`}><SecondaryButton label='View Profile' onSubmit={() => {}} valid={true} /></Link>
              <Link href={"/about"}><SecondaryButton label='About' onSubmit={() => {}} valid={true} /></Link>
              <SecondaryButton label='Logout' onSubmit={onLogout} valid={true} />
            </div>
          ) : (
            <div className={styles.second}>
              <Link href={"/about"}><SecondaryButton label='About' onSubmit={() => {}} valid={true} /></Link>
              <Link href="/login"><PrimaryButton label='Login' onSubmit={() => {}} valid={true} /></Link>
              <Link href="/u/new"><PrimaryOutlineButton label='Create Account' onSubmit={() => {}} valid={true} /></Link>
            </div>
          )
      }
    </div>
  )
}
'use client'

import { SecondaryButton, SignInGoogleButton, SubmitButton } from "@/components/formElements/FormButton";
import TextInput from "@/components/formElements/TextInput";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, createUser, googleProvider, userExists } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/lib/types";
import layoutStyle from "@/app/layout.module.css"
import formStyle from "@/components/Form.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Page() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isValid = username.length > 0 && password.length > 0
  const router = useRouter()

  const handleSubmit = async () => {
    signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
      router.push(`/u/${userCredential.user.uid}`)
    }).catch((error) => {
      console.error(error)
    })
    
  }

  const handleGoogleSubmit = async () => {
    signInWithPopup(auth, googleProvider).then(async (result) => {
      let exists = await userExists(result.user.uid)
      if (!exists) {
        const newUser : User = {
          id: result.user.uid,
          username: "",
          email: result.user.email || "",
          bio: "",
          role: UserRole.user,
          dateJoined: Date.now(),
        }
        createUser(newUser)
        router.push(`/u/edit`)
      } else {
        router.push(`/u/${result.user.uid}`)
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className={formStyle.formLayout}>
      <div className={formStyle.formSection}>
        <div className={formStyle.card}>
          <div className={formStyle.title}>Crysanthenums</div>
          <TextInput label="Username" value={username} placeholder="Email" onValueChanged={setUsername} />
          <TextInput label="Password" value={password} placeholder="Password" onValueChanged={setPassword} />

          <SubmitButton label="Sign In" onSubmit={handleSubmit} valid={isValid} />
          <SignInGoogleButton label="Sign In With Google" onSubmit={handleGoogleSubmit} valid={true} />
          <Link href={"/u/new"}><SecondaryButton label="Create New Account" onSubmit={() => {}} valid={true}></SecondaryButton></Link>
        </div>
      </div>
      <div className={formStyle.formSection}>
        <div className={layoutStyle.imgWrapperFull}>
          <Image src={"/placeholder.jpeg"} alt={"flower"} style={{objectFit: "cover"}} fill sizes='50vw'/>
        </div>
      </div>
    </div>
  )
}
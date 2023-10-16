'use client'

import FormButton from "@/components/formElements/FormButton";
import TextInput from "@/components/formElements/TextInput";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, createUser, googleProvider, userExists } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/lib/types";

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
        router.push(`/u/${newUser.id}/edit`)
      } else {
        router.push(`/u/${result.user.uid}`)
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
   <div>
    <TextInput label="Username" value={username} placeholder="username" onValueChanged={setUsername} />
    <TextInput label="Password" value={password} placeholder="password" onValueChanged={setPassword} />

    <FormButton label="Submit" onSubmit={handleSubmit} valid={isValid} />
    <FormButton label="Sign In With Google" onSubmit={handleGoogleSubmit} valid={true} />
   </div>
  )
}
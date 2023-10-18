'use client'

import { User, UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "./formElements/TextInput";
import { ImageInput } from "./formElements/ImageInput";
import { SubmitButton } from "./formElements/FormButton";
import { createPasswordUser, editUserProfilePic } from "@/lib/firebase";
import FormLayout from "./formElements/FormLayout";
import formStyle from "@/components/formElements/Form.module.css"

export const UserCreateForm = (props : { user : User } ) => {

  const router = useRouter();
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("") // TODO: input validation
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const isValid = (
    username.length > 0 && username.length < 500 &&
    email.length > 0 && email.length < 500 && 
    profilePic != null
  )

  const handleSubmit = async () => {
    let userData : User = {
      id: "",
      username: username,
      email: email,
      bio: "",
      role: UserRole.user,
      dateJoined: Date.now()
    }

    let docRef = await createPasswordUser(userData, password)
    await editUserProfilePic(docRef.id, profilePic!)

    router.push(`/u/${docRef.id}`)
  }

  return (
    <FormLayout>
      <div className={formStyle.title}>Create Account</div>
      <TextInput onValueChanged={setUsername} value={username} placeholder={"username"} label="Username" />
      <TextInput onValueChanged={setEmail} value={email} placeholder={"email"} label="Email" />
      <TextInput onValueChanged={setPassword} value={password} placeholder={"password"} label="Password" />
      <ImageInput onSelect={setProfilePic} />
      <SubmitButton onSubmit={handleSubmit} valid={isValid} label="Create New Account" />
    </FormLayout>
  );
};

export default UserCreateForm;

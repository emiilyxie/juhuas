'use client'

import { User, UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "./formElements/TextInput";
import { ImageInput } from "./formElements/ImageInput";
import FormButton from "./formElements/FormButton";
import { createPasswordUser, editUserProfilePic } from "@/lib/firebase";

export const UserCreateForm = (props : { user : User } ) => {

  const router = useRouter();
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("") // TODO: input validation
  const [bio, setBio] = useState(props.user.bio);
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
      bio: bio,
      role: UserRole.user,
      dateJoined: Date.now()
    }

    let docRef = await createPasswordUser(userData, password)
    await editUserProfilePic(docRef.id, profilePic!)

    router.push(`/u/${docRef.id}`)
  }

  return (
    <div>
      
      <TextInput onValueChanged={setUsername} value={username} placeholder={"username"} label="Username" />
      <TextInput onValueChanged={setEmail} value={email} placeholder={"email"} label="Email" />
      <TextInput onValueChanged={setPassword} value={password} placeholder={"password"} label="Password" />
      <TextInput onValueChanged={setBio} value={bio} placeholder={"bio"} label="Bio" />
      <ImageInput onSelect={setProfilePic} />
      <FormButton onSubmit={handleSubmit} valid={isValid} label="Submit" />

    </div>
  );
};

export default UserCreateForm;

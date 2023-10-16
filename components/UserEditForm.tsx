'use client'

import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "./formElements/TextInput";
import { ImageInput } from "./formElements/ImageInput";
import FormButton from "./formElements/FormButton";
import { deleteUser, editUser, editUserProfilePic } from "@/lib/firebase";

export const UserEditForm = (props : { user : User } ) => {

  const router = useRouter();
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState(""); // TODO: make this more secure
  const [bio, setBio] = useState(props.user.bio);
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const isValid = (
    username.length > 0 && username.length < 500 &&
    email.length > 0 && email.length < 500
  )

  const handleSubmit = async () => {
    let userData : Partial<User> = {
      username: username,
      email: email,
      bio: bio
    }

    let docRef = await editUser(props.user.id, userData)
    if (profilePic) {
      await editUserProfilePic(props.user.id, profilePic)
    }

    router.push(`/u/${docRef.id}`)
  }

  const handleDelete = async () => {
    deleteUser(props.user.id)
    router.push("/")
  }

  return (
    <div>
      
      <TextInput onValueChanged={setUsername} value={username} placeholder={"username"} label="Username" />
      <TextInput onValueChanged={setEmail} value={email} placeholder={"email"} label="Email" />
      <TextInput onValueChanged={setBio} value={bio} placeholder={"bio"} label="Bio" />
      <ImageInput onSelect={setProfilePic} />
      <FormButton onSubmit={handleSubmit} valid={isValid} label="Submit" />
      <FormButton onSubmit={handleDelete} valid={true} label="Delete" />

    </div>
  );
};

export default UserEditForm;

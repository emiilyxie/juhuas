import { UserCreateForm } from "@/components/UserCreateForm"
import { User, UserRole } from "@/lib/types"

export default function Page() {

  const newUser : User = {
    id: "",
    username: "",
    email: "",
    bio: "",
    role: UserRole.user,
    dateJoined: Date.now(),
  }

  return (
    <>
      <div><UserCreateForm user={newUser}/></div>
    </>

  )
}

// login
// sign in  form
// sign in google button
// link to create account

// new acc page
// on submit, create user
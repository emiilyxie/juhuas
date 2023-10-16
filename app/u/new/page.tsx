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
      <div>new</div>
      <div><UserCreateForm user={newUser}/></div>
    </>

  )
}
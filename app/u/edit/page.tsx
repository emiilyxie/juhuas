'use client'

import { UserEditForm } from "@/components/UserEditForm";
import { getUser } from "@/lib/firebase";
import { useUserData } from "@/lib/hooks";
import { User } from "@/lib/types"
import { useEffect, useState } from "react";

export default function Page() {

  let [user, setUser] = useState<User | null>(null);
  let [loading, setLoading] = useState(true);
  let userData = useUserData()

  useEffect(() => {
    (async () => {
      if (userData.user?.id) {
        try {
          const user = await getUser(userData.user.id)
          setUser(user)
        } catch (error) {
          console.error(error)
          // handle error here
        }
      }
      setLoading(false)
    })()
  }, [userData])
  

  return (
    <>
      <div>edit user</div>
      {loading ? "loading" :
        user ? 
        <div><UserEditForm user={user}/></div> : 
        <div>Please log in.</div>
      }
    </>
  )
}
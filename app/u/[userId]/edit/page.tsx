'use client'

import { UserEditForm } from "@/components/UserEditForm";
import { getUser } from "@/lib/firebase";
import { useUserData } from "@/lib/hooks";
import { User } from "@/lib/types"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params } : { params : { userId : string }}) {
  const { userId } = params

  let [user, setUser] = useState<User | null>(null);
  let [loading, setLoading] = useState(true);
  let [authorized, setAuthorized] = useState(false)
  let userData = useUserData()

  useEffect(() => {
    if (userData.user?.id == userId) {
      setAuthorized(true)
    }
  }, [userData.loading])

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(userId)
        setUser(user)
      } catch (error) {
        console.error(error)
        // handle error here
      }
      setLoading(false)
    })()
  }, [userId])
  

  return (
    <>
      <div>edit user</div>
      { authorized ? 
        (loading ? "loading" :
        user ? <div><UserEditForm user={user}/></div> : 
        "404") :
        <div>unauthorized</div>
      }
    </>
  )
}
'use client'

import { UserEditForm } from "@/components/UserEditForm";
import { getUser } from "@/lib/firebase";
import { User } from "@/lib/types"
import { useEffect, useState } from "react";

export default function Page({ params } : { params : { userId : string }}) {
  let [user, setUser] = useState<User | null>(null);
  let [loading, setLoading] = useState(true);

  const { userId } = params

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
      { loading ? "loading" :
        user ? <div><UserEditForm user={user}/></div> : 
        "404"
      }
    </>
  )
}
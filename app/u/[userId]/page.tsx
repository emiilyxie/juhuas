'use client'

import { getUser } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import Link from "next/link";

export default function Page({ params }: { params : { userId : string }}) {
  const { userId } = params
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      <div>a user</div>
      <div>{loading ? "loading" : 
      ( user ? 
        <div>
          <div>{user.username}</div>
          <div>{user.bio}</div>
          <Link href={`${user.id}/edit`}>edit user</Link>
        </div> : 
        "404" )}</div>
    </div>
  )
}
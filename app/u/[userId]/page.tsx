'use client'

import { getUser, getUserPosts } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Post, User } from "@/lib/types";
import Link from "next/link";
import { PostGrid } from "@/components/PostGrid";
import { useUserData } from "@/lib/hooks";

export default function Page({ params }: { params : { userId : string }}) {
  const { userId } = params
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const userData = useUserData()

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(userId)
        setUser(user)

        try {
          const userPosts = await getUserPosts(userId)
          setPosts(userPosts)
        } catch (error) {
          console.error(error)
          // handle error here
        }
        setLoadingPosts(false)
      } catch (error) {
        console.error(error)
        // handle error here
      }
      setLoadingUser(false)
    })()
  }, [userId])

  return (
    <div>
      <div>a user</div>
      <div>
      {
        loadingUser ? "loadingUser" : 
        (user ? 
        <div>
          <div>{user.username}</div>
          <div>{user.bio}</div>
          { userData.user?.id == userId &&
            <Link href={`${user.id}/edit`}>edit user</Link>}

          <div>posts</div>
          {
            loadingPosts ? "loadingPosts" :
            <PostGrid posts={posts} />
          }
        </div> : 
        "404" )
      }</div>
    </div>
  )
}
'use client'

import { getUser, getUserPosts } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Post, User } from "@/lib/types";
import { PostGrid } from "@/components/PostGrid";
import Sidebar from "@/components/Sidebar";
import layoutStyle from "@/app/layout.module.css"
import Link from "next/link";

export default function Page({ params }: { params : { userId : string }}) {
  const { userId } = params
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

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
    <div className={layoutStyle.main}>
      <Sidebar>
      {
        loadingUser ? 
        "loadingUser" : 
        user ? 
        <div>
          <div>{user.username}</div>
          <div>{user.bio}</div>

          {
            userId == user.id &&
            <Link href="/u/edit">Edit Profile</Link>
          }

        </div> : 
        "404" 
      }
      </Sidebar>

      <div className={layoutStyle.second}>
        {
          loadingPosts ? "loading posts" :
          <PostGrid posts={posts} />
        }
        </div>
    </div>
  )
}
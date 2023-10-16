'use client'

import { PostEditForm } from "@/components/PostForm"
import { getPost } from "@/lib/firebase";
import { useUserData } from "@/lib/hooks";
import { Post } from "@/lib/types"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params } : { params : { postId : string }}) {
  const { postId } = params
  let [post, setPost] = useState<Post | null>(null);
  let [loading, setLoading] = useState(true);
  let [authorized, setAuthorized] = useState(false)

  let userData = useUserData()

  useEffect(() => {
    if (userData.user && post && userData.user.id == post.userid) {
      console.log(userData.user?.id)
      console.log("authorized")
      setAuthorized(true)
    }
  }, [userData, post])

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        setPost(post)
      } catch (error) {
        console.error(error)
        // handle error here
      }
      setLoading(false)
    })()
  }, [postId])
  

  return (
    <>
      <div>edit post</div>
      { authorized ?
        (loading ? "loading" :
        post ? <div><PostEditForm post={post}/></div> : 
        "404") :
        <div>unauthorized</div>
      }
    </>
  )
}
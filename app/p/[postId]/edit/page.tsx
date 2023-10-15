'use client'

import { PostForm } from "@/components/PostForm"
import { getPost } from "@/lib/firebase";
import { Post } from "@/lib/types"
import { useEffect, useState } from "react";

export default function Page({ params } : { params : { postId : string }}) {
  let [post, setPost] = useState<Post | null>(null);
  let [loading, setLoading] = useState(true);

  const { postId } = params

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
  })
  

  return (
    <>
      <div>edit post</div>
      { loading ? "loading" :
        post ? <div><PostForm edit={true} post={post}/></div> : 
        "404"
      }
    </>
  )
}
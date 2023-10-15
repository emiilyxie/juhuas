'use client'

import { getPost } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";
import Link from "next/link";

export default function Page({ params }: { params : { postId : string }}) {
  const { postId } = params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      <div>a post</div>
      <div>{loading ? "loading" : 
      ( post ? 
        <div>
          <div>{post.caption}</div>
          <Link href={`${post.id}/edit`}>edit post</Link>
        </div> : 
        "404" )}</div>
    </div>
  )
}
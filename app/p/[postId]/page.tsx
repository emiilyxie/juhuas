'use client'

import { getPost } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";

export default function Page({ params }: { params : { postId : string }}) {
  const { postId } = params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        console.log(post)
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
      <div>{loading ? "loading" : ( post ? post.id : "404" )}</div>
    </div>
  )
}


// TODO: rest of posts are 404
// export async function generateStaticParams() {
//   console.log("generating static params")
//   return (await getCollection("posts")).docs.map(post => ({ post: post.id }))
// }

// export const dynamicParams = false

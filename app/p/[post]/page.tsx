'use client'

import { getPost } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params
  const [postDoc, setPostDoc] = useState<Post | null>(null);

  useEffect(() => {
    // let p = getPost(postId)
    let p = {
      id: "aaa",
      flower: "flowerType2",
      user: "aaa"
    }
    setPostDoc(p)
  })

  // getDocFromCollection("posts", postId).then(doc => setPostDoc(doc))

  return (
    <div>
      <div>a post.</div>
      <div>{postDoc && postDoc.id}</div>
    </div>
  )
}


// TODO: rest of posts are 404
// export async function generateStaticParams() {
//   console.log("generating static params")
//   return (await getCollection("posts")).docs.map(post => ({ post: post.id }))
// }

// export const dynamicParams = false

'use client'

import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Page({ params }: { params: { post: string } }) {
  const { post } = params
  const ref = doc(db, 'posts', post)
  const [postSnapshot, loading, error] = useDocument(ref);

  return (
    <div>
      <div>a post.</div>
      {postSnapshot && <div>{postSnapshot.data().user}</div>}
    </div>
  )
}

export async function generateStaticParams() {
  const postSnapshot = await getDocs(collection(db, "posts"));
  return postSnapshot.docs.map(post => ({ post: post.id }))
}

export const dynamicParams = false
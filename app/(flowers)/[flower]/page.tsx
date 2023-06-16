'use client'

import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getCollection } from "@/lib/firebase";

import Link from 'next/link'

export default function Page({ params }: { params: { flower: string } }) {
  const { flower } = params

  const q = query(collection(db, "posts"), where("flower", "==", flower));
  const [postsSnapshot, loading, error] = useCollection(q);

  return (
    <div>
      <div>{flower}</div>
      {postsSnapshot && postsSnapshot.docs.map(post => <Link href={`/p/${post.id}`}>{post.data().user}</Link>)}
    </div>
  )
}

export async function generateStaticParams() {
  return (await getCollection("flowers")).docs.map(flower => ({ flower: flower.data().name }))
}

export const dynamicParams = false
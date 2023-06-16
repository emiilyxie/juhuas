'use client'

import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from 'next/link'

export default function Home() {
  const query = collection(db, "flowers");
  const [flowerSnapshot, loading, error] = useCollection(query);
  
  return (
    <>
      <div>hi welcome</div>
      {loading && <span>Loading...</span>}
      {flowerSnapshot && flowerSnapshot.docs.map(doc => <Link href={doc.data().name}>{doc.data().name}</Link>)}
    </>
  )
}

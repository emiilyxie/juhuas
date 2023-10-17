'use client'

import Link from 'next/link'
import { FlowerTypes, Post } from "@/lib/types";
import { useEffect, useState } from 'react';
import { getPosts } from '@/lib/firebase';
import { useUserData } from '@/lib/hooks';
import { PostGrid } from '@/components/PostGrid';

export default function Home() {

  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)
  let userData  = useUserData

  useEffect(() => {
    (async () => {
      const p = await getPosts()
      setPosts(p)
      setLoading(false)
    })()
  }, [])

  return (
    <div>
      <div>juhua</div>
      {loading ? "loading" : ( posts ? <PostGrid posts={posts} /> : "404" )}
    </div>
  )
    
  // return (
  //   <>
  //     <div>hi welcome</div>
  //     { Object.keys(FlowerTypes).map(f => <Link href={f} key={f}><div>{f}</div></Link>) }
  //   </>
  // )
}
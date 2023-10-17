'use client'

import { Post } from "@/lib/types";
import { useEffect, useState } from 'react';
import { getPosts } from '@/lib/firebase';
import { PostGrid } from '@/components/PostGrid';
import styles from "@/app/layout.module.css"
import Sidebar from "@/components/Sidebar";

export default function Home() {

  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const p = await getPosts()
      setPosts(p)
      setLoading(false)
    })()
  }, [])

  return (
    <div className={styles.main}>
      <Sidebar><div></div></Sidebar>
      <div>{loading ? "loading" : ( posts ? <PostGrid posts={posts} /> : "404" )}</div>
    </div>
  )
}
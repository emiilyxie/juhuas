'use client'

import Link from 'next/link'
import { FlowerTypes, Post } from '@/lib/types'
import { getFlowerPosts } from '@/lib/firebase'
import { PostGrid } from '@/components/PostGrid'
import { useEffect, useState } from 'react'

export default function Page({ params } : { params : { flower : FlowerTypes } }) {
  const { flower } = params
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    (async () => {
      const flowerPosts = await getFlowerPosts(flower)
      setPosts(flowerPosts)
    })()
  }, [flower])
  
  // const flowerPosts : Post[] = [
  //   {
  //     id: "aaa",
  //     flower: "flowerType1",
  //     user: "aaa"
  //   },
  //   {
  //     id: "bbb",
  //     flower: "flowerType2",
  //     user: "bbb"
  //   },
  // ]

  return (
    <div>
      <div>{flower}</div>
      <PostGrid posts={posts} />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(FlowerTypes).map((f) => ({flower: f}))
}

export const dynamicParams = false
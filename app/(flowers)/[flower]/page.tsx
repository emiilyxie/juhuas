'use client'

import { FlowerTypes, Post } from '@/lib/types'
import { getFlowerPosts } from '@/lib/firebase'
import { PostGrid } from '@/components/PostGrid'
import { useEffect, useState } from 'react'

export default function Page({ params } : { params : { flower : FlowerTypes } }) {
  const { flower } = params
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (Object.keys(FlowerTypes).includes(flower)) {
        const flowerPosts = await getFlowerPosts(flower)
        setPosts(flowerPosts)
      }
      setLoading(false)
    })()
  }, [flower])

  return (
    <div>
      <div>{flower}</div>
      {loading ? "loading" : ( posts ? <PostGrid posts={posts} /> : "404" )}
    </div>
  )
}
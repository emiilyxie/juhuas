'use client'

import { FlowerTypes, Post } from '@/lib/types'
import { auth, getFlowerPosts } from '@/lib/firebase'
import { PostGrid } from '@/components/PostGrid'
import { useContext, useEffect, useState } from 'react'
import { useUserData } from '@/lib/hooks'
import { UserContext } from '@/lib/contexts'

export default function Page({ params } : { params : { flower : FlowerTypes } }) {
  const { flower } = params
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)
  let userData  = useContext(UserContext)

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
      {userData && <div>{userData.user?.email}</div>}
    </div>
  )
}
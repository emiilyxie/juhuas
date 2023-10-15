import Link from 'next/link'
import { FlowerTypes, Post } from '@/lib/types'
import { getFlowerPosts } from '@/lib/firebase'
import { Posts } from '@/components/posts'

export default function Page({ params } : { params : { flower : string } }) {
  const { flower } = params

  // TODO: this function should be async in the future
  // const flowerPosts = getFlowerPosts(flower)
  const flowerPosts : Post[] = [
    {
      id: "aaa",
      flower: "flowerType1",
      user: "aaa"
    },
    {
      id: "bbb",
      flower: "flowerType2",
      user: "bbb"
    },
  ]

  return (
    <div>
      <div>{flower}</div>
      <Posts posts={flowerPosts} />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(FlowerTypes).map((f) => ({flower: f}))
}

export const dynamicParams = false
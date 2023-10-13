import Link from 'next/link'
import { FlowerTypes, Post } from '@/lib/types'
import { getFlowerPosts } from '@/lib/firebase'
import { Posts } from '@/components/posts'

export default function Page({ params }: { params: { flower: string } }) {
  const { flower } = params

  // const flowerPosts = getFlowerPosts(flower)
  const flowerPosts : Post[] = [
    {
      flower: "flowerType1",
      user: "aaa"
    },
    {
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

// TODO: only allow flowers in the enum to be paths, rest are 404
export function generateStaticParams() {
  return Object.keys(FlowerTypes)
}
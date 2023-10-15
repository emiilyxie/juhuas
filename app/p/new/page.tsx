import { PostForm } from "@/components/PostForm"
import { Post } from "@/lib/types"

export default function Page() {

  const newPost : Post = {
    id: "",
    userid: "",
    caption: "",
    flowers: [],
    date: Date.now(),
  }

  return (
    <>
      <div>new</div>
      <div><PostForm edit={false} post={newPost}/></div>
    </>

  )
}
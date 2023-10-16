import { PostCreateForm } from "@/components/PostForm"
import { Post } from "@/lib/types"

export default function Page() {

  const newPost : Post = {
    id: "",
    userid: "",
    caption: "",
    flowers: [],
    likes: [],
    comments: [],
    date: Date.now(),
  }

  return (
    <>
      <div>new</div>
      <div><PostCreateForm post={newPost}/></div>
    </>

  )
}
import { Post } from "@/lib/types";

export function Posts(props : { posts : Post[] }) {

  return (
    <div>{props.posts.map(p => <div>{p.flower}</div>)}</div>
  )
}
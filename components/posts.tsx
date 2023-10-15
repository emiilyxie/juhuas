import { Post } from "@/lib/types";
import Link from "next/link";

export function Posts(props : { posts : Post[] }) {

  return (
    <div>
      {props.posts.map(p => <Link href={`p/${p.id}`}><div>{p.caption}</div></Link>)}
    </div>
  )
}
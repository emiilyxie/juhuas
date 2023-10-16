import { Post } from "@/lib/types";
import Link from "next/link";
import PostGridItem from "./PostGridItem";

export function PostGrid(props : { posts : Post[] }) {

  return (
    <div>
      {props.posts.map(p => 
        <Link href={`/p/${p.id}`} key={p.id}>
          <PostGridItem post={p} />
        </Link>)}
    </div>
  )
}
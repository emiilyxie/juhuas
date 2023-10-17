import { Post } from "@/lib/types";
import Link from "next/link";
import PostGridItem from "./PostGridItem";
import styles from "@/components/PostGrid.module.css"

export function PostGrid(props : { posts : Post[] }) {

  return (
    <div className={styles.grid}>
      {props.posts.map(p => 
        <Link href={`/p/${p.id}`} key={p.id}>
          <PostGridItem post={p} />
        </Link>)}
    </div>
  )
}
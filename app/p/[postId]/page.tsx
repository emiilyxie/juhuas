'use client'

import { updatePost, getPost, getPostComments, addPostComment } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Comment, Post } from "@/lib/types";
import Link from "next/link";
import { useUserData } from "@/lib/hooks";
import FormButton from "@/components/formElements/FormButton";
import TextInput from "@/components/formElements/TextInput";

export default function Page({ params }: { params : { postId : string }}) {
  const { postId } = params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [currentComment, setCurrentComment] = useState("")
  let userData = useUserData()

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        const comments = await getPostComments(postId)
        setPost(post)
        setComments(comments)
        if (userData.user && post) {
          setLiked(post.likes.includes(userData.user.id))
        }
      } catch (error) {
        console.error(error)
        // handle error here
      }
      setLoading(false)
    })()
  }, [postId])

  useEffect(() => {
    if (userData.user && post) {
      setLiked(post.likes.includes(userData.user.id))
    }
  }, [userData.user])

  const likePost = async () => {
    if (userData.user && post) {
      if (!post.likes.includes(userData.user.id)) {
        post.likes.push(userData.user.id)
        updatePost(post)
        setLiked(true)
      }
    }
  }

  const unlikePost = async () => {
    if (userData.user && post) {
      if (post.likes.includes(userData.user.id)) {
        post.likes = post.likes.filter((id) => id != userData.user!.id)
        updatePost(post)
        setLiked(false)
      }
    }
  }

  const addComment = async () => {
    if (userData.user && post) {
      let comment : Comment = {
        id: "",
        userid: userData.user.id,
        postid: post.id,
        message: currentComment,
        date: Date.now()
      }
      post.comments.push(comment)
      addPostComment(comment)
      setComments([...comments, comment])
      setCurrentComment("")
    }
  }

  return (
    <div>
      <div>a post</div>
      <div>{loading ? "loading" : 
      ( post ? 
        <div>
          <div>{post.caption}</div>
          <Link href={`../u/${post.userid}`}>author</Link>
          { userData.user?.id == post.userid &&
            <Link href={`${post.id}/edit`}>edit post</Link>}
          { userData.user && 
            <>{liked ? 
            <FormButton onSubmit={unlikePost} label="remove like" valid={true} /> : 
            <FormButton onSubmit={likePost} label="like" valid={true} />}
            <TextInput onValueChanged={setCurrentComment} label="comment" placeholder="comment" value={currentComment} />
            <FormButton onSubmit={addComment} label="comment" valid={currentComment != ""} />
            {
              comments.map((comment) => {
                return <div key={comment.date}>{comment.message}</div>
              })
            }
            </>
          }
        </div> : 
        "404" )}</div>
    </div>
  )
}
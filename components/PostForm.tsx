'use client'

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { createPost, deletePost, editPost } from "@/lib/firebase";
import { FlowerTypes, Post } from '@/lib/types';
import { ImageInput } from './formElements/ImageInput';
import { useUserData } from '@/lib/hooks';

export function PostCreateForm(props: {post: Post}){

  let userData = useUserData();
  const router = useRouter();
  const [caption, setCaption] = useState(props.post.caption);
  const [imgs, setImgs] = useState<File[] | null>(null);
  const [flowers, setFlowers] = useState<FlowerTypes[]>(props.post.flowers);
  const isValid = (
    caption.length > 0 && caption.length < 500 && 
    flowers.length > 0 &&
    imgs && imgs.length > 0)

  const handleSubmit = async () => {
    if (userData.user) {
      const newPost : Post = {
        id: "",
        userid: userData.user?.id!,
        caption: caption,
        flowers: flowers,
        date: Date.now(),
      }
  
      let docRef = await createPost(newPost, imgs!);
      router.push(`/p/${docRef.id}`);
    } else {
      console.log("uhoh no user logged in")
    }
  }

  let setImgsArray = (file : File) => {
    if (imgs) {
      setImgs([...imgs, file]);
    } else {
      setImgs([file]);
    }
  }

  let setFlowersArray = (e : ChangeEvent<HTMLSelectElement>) => {
    let options = e.target.options;
    let values : FlowerTypes[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value as FlowerTypes);
      }
    }
    setFlowers(values);
  }

  return (
    <div>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="caption"
      />

      <ImageInput onSelect={setImgsArray}/>

      <div>
      <label htmlFor="flowers">Flower Types:</label>
      <select name="flowers" id="flowers" onChange={setFlowersArray} multiple>
        {Object.entries(FlowerTypes).map((f) => {
          return <option key={f[0]} value={f[0]}>{f[1]}</option>
        })}
      </select>
      </div>

      <button onClick={handleSubmit} disabled={!isValid}>
        {"Create"} Post
      </button>
    </div>
  )

}

export function PostEditForm(props : { post : Post } ) {
  const router = useRouter();
  const [caption, setCaption] = useState(props.post.caption);
  const [flowers, setFlowers] = useState<FlowerTypes[]>(props.post.flowers);
  let userData = useUserData();

  const isValid = (
    caption.length > 0 && caption.length < 500 && 
    flowers.length > 0
  )
  const handleSubmit = async () => {

    if (userData.user) {
      const newPost : Post = {
        id: props.post.id,
        userid: userData.user.id,
        caption: caption,
        flowers: flowers,
        date: Date.now(),
      }

      let docRef = await editPost(newPost);
      router.push(`/p/${docRef.id}`);
    }
  }

  const handleDelete = async () => {
    deletePost(props.post)
    router.push("/");
  }

  let setFlowersArray = (e : ChangeEvent<HTMLSelectElement>) => {
    let options = e.target.options;
    let values : FlowerTypes[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value as FlowerTypes);
      }
    }
    setFlowers(values);
  }

  return (
    <div>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="description"
      />

      <div>
      <label htmlFor="flowers">Flower Types:</label>
      <select name="flowers" id="flowers" onChange={setFlowersArray} multiple>
        {Object.entries(FlowerTypes).map((f) => {
          return <option key={f[0]} value={f[0]}>{f[1]}</option>
        })}
      </select>
      </div>

      <button onClick={handleSubmit} disabled={!isValid}>
        Update Post
      </button>

        <button onClick={handleDelete}>
          Delete Post
        </button>
    </div>
  )
}
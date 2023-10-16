'use client'

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { createPost, deletePost, editPost } from "@/lib/firebase";
import { FlowerTypes, Post } from '@/lib/types';
import { ImageInput } from './formElements/ImageInput';

export function PostForm(props : { edit : boolean, post : Post } ) {
  const router = useRouter();
  const [caption, setCaption] = useState(props.post.caption);
  const [imgs, setImgs] = useState<File[] | null>(null);
  const [flowers, setFlowers] = useState<FlowerTypes[]>(props.post.flowers);

  // TODO: account for multiple images and change image name
  // TODO: make the multiselect better
  // TODO: make the transaction atomic
  // TODO: make the image preview better
  // TODO: make the form prettier

  const isValid = (
    caption.length > 0 && caption.length < 500 && 
    flowers.length > 0 &&
    (props.edit || !props.edit && imgs && imgs.length > 0))

  const handleSubmit = async () => {

    console.log("im being called?")
    const newPost : Post = {
      id: props.post.id,
      userid: "ktnkog5xAQKwIVOiN3aZ", // TODO: get the user id
      caption: caption,
      flowers: flowers,
      date: Date.now(),
    }

    let docRef = null;
    if (props.edit) {
      docRef = await editPost(newPost);
    } else {
      docRef = await createPost(newPost, imgs!);
    }

    router.push(`/p/${docRef.id}`);
  }

  const handleDelete = async () => {
    deletePost(props.post)
    router.push("/");
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
        placeholder="description"
      />

      {!props.edit && 
        <ImageInput onSelect={setImgsArray}/>}

      <div>
      <label htmlFor="flowers">Flower Types:</label>
      <select name="flowers" id="flowers" onChange={setFlowersArray} multiple>
        {Object.entries(FlowerTypes).map((f) => {
          return <option key={f[0]} value={f[0]}>{f[1]}</option>
        })}
      </select>
      </div>

      <button onClick={handleSubmit} disabled={!isValid}>
        {props.edit ? "Update" : "Create"} Post
      </button>

      {props.edit &&
        <button onClick={handleDelete}>
          Delete Post
        </button>}
    </div>
  );
}
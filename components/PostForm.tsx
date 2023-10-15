'use client'

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createPost, db } from "@/lib/firebase";
import { FlowerTypes, Post } from '@/lib/types';
import { ImageInput } from './ImageInput';

export function PostForm() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [imgs, setImgs] = useState<File[] | null>(null);
  const [flowers, setFlowers] = useState<FlowerTypes[]>([]);

  // TODO: account for multiple images and change image name
  // TODO: make the multiselect better
  // TODO: make the transaction atomic
  // TODO: make the image preview better
  // TODO: make the form prettier

  const isValid = (
    caption.length > 0 && caption.length < 500 && 
    imgs != null && imgs.length > 0 &&
    flowers.length > 0)

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post : Post = {
      id: "",
      userid: "ktnkog5xAQKwIVOiN3aZ",
      caption: caption,
      images: imgs!.map((img) => img.name), // TODO: generate the name
      flowers: flowers,
      date: Date.now(),
    }

    let docRef = await createPost(post, imgs!);

    // const docRef = await addDoc(collection(db, "posts"), data);
    // const storage = getStorage();
    // let imgRef = ref(storage, `posts/${docRef.id}/${Date.now()}.jpg`);
    // await uploadBytes(imgRef, img!);

    router.push(`/p/${docRef.id}`);
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
    <form onSubmit={handleSubmit}>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="description"
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

      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
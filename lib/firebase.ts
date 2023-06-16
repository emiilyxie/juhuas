// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

import { Post } from '@/lib/types'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

export async function getCollection(collectionName : string) {
  return await getDocs(collection(db, collectionName));
}

export async function getFlowerPosts(flowerName : string) {
  const q = query(collection(db, "posts"), where("flower", "==", flowerName));
  const posts = await getDocs(q);
  console.log(posts.docs.map(doc => doc.data()));
  return posts.docs.map(doc => doc.data()) as Post[];
}

export async function getPostLikes(postId : string) {
  const q = query(collection(db, "posts", postId, "likes"));
  const likes = await getDocs(q);
  return likes.docs.map(doc => doc.data());
}
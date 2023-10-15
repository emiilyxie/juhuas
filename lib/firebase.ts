// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

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

export async function getDocFromCollection(collectionName : string, docId : string) {
  return await getDoc(doc(db, collectionName, docId));
}

export async function getFlowerPosts(flowerName : string) {
  const q = query(collection(db, "posts"), where("flower", "==", flowerName));
  const posts = await getDocs(q);
  console.log(posts.docs.map(doc => doc.data()));
  return posts.docs.map(doc => doc.data()) as Post[];
}

export async function getPost(postId : string) {
  return null
}

export async function getPostLikes(postId : string) {
  const q = query(collection(db, "posts", postId, "likes"));
  const likes = await getDocs(q);
  return likes.docs.map(doc => doc.data());
}

// planning and structuring

// interaction flow
// go on website, first thing you see is flower page
// you can see all the different types of ju huas
// click on a flower to bring up its posts.
// can query the post with filter, also sort by most recent / likes
// can tap into a post to enlargen it, see its caption, likes, author
// you can also like / comment on the post
// click on author to view author page
// can see list of author's posts

// probably some good functions to have:
// use crud
// crud user 
// crud post
// getPosts + operations to filter by author, type, and to sort by likes, time posted
// crd postLikes

// database
// user has many posts, post has one user
// user likes many posts, posts have many user likes. but a user can only
// give one like to a post, so it's the primary key
// user can comment on the post multiple times
// post: id, description, flower tags, date posted, author, photos
// user: id, username, email
// postlikes: postid, userid
// postComment: commentid, postid, userid, comment, date

// some things we can hard code for now, because it will probably
// not change in the future and we want it to load fast, also for seo:
// the flower page with the different types of flowers
// i think it would be fun to 3d generate them or something

// login, auth
// once you login, you see your account and your posts
// also a home button at the top so you can go back home
// only logged in users can cud their own post and cd postLikes
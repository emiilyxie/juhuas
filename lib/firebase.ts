// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc, DocumentReference, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FlowerTypes, Post } from '@/lib/types'

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

export const getFlowerPosts = async (flowerType: FlowerTypes): Promise<Post[]> => {
  const q = query(collection(db, "posts"), where("flowers", "array-contains", flowerType))
  const posts = await getDocs(q)
  console.log(posts.docs.map(doc => doc.data()))
  return posts.docs.map(doc => {
    const data = doc.data();
    const post: Post = {
      id: doc.id,
      userid: data.author,
      caption: data.caption,
      images: data.photos,
      flowers: data.flowers,
      date: data.date,
    };
    return post as Post;
  });
}

export const getPost = async (postId: string) : Promise<Post> => {
  const docRef = doc(db, "posts", postId)
  const postDoc = await getDoc(docRef);
  if (postDoc.exists()) {
    const postData = postDoc.data();
    const post: Post = {
      id: postDoc.id,
      userid: postData.userid,
      caption: postData.caption,
      images: postData.images,
      flowers: postData.flowers,
      date: postData.date,
    }
    return post as Post
  } else {
    throw new Error("Post does not exist")
  }
}

export const createPost = async (post: Post, files: File[]): Promise<DocumentReference> => {
  console.log("creating post")
  const postRef = collection(db, "posts");
  const postDoc = await addDoc(postRef, {
    userid: post.userid,
    caption: post.caption,
    images: post.images,
    flowers: post.flowers,
    date: serverTimestamp(),
  })

  console.log(postDoc)

  const storage = getStorage(app);
  const postImagesRef = ref(storage, `posts/${postDoc.id}/images`);

  for (const file of files) {
    await uploadBytes(postImagesRef, file);
  }

  return postDoc
};

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
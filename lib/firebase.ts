// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc, DocumentReference, serverTimestamp, updateDoc, deleteDoc, setDoc, or, orderBy } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, list, listAll, ref, uploadBytes } from "firebase/storage";
import { Comment, FlowerTypes, Post, User } from '@/lib/types'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

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
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// TODO: make some helper functions to serialize data into types

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
      flowers: data.flowers,
      likes: data.likes || [],
      comments: data.comments || [],
      date: data.date,
    };
    return post as Post;
  });
}

export const getPost = async (postId: string) : Promise<Post> => {
  const docRef = doc(db, "posts", postId)
  const userDoc = await getDoc(docRef);
  if (userDoc.exists()) {
    const postData = userDoc.data();
    const post: Post = {
      id: userDoc.id,
      userid: postData.userid,
      caption: postData.caption,
      flowers: postData.flowers,
      likes: postData.likes || [],
      comments: postData.comments || [],
      date: postData.date,
    }
    return post as Post
  } else {
    throw new Error("Post does not exist")
  }
}

export const getPostImages = async (postId: string): Promise<string[]> => {
  const storage = getStorage(app);
  const postImagesRef = ref(storage, `posts/${postId}`);
  const imagesList = await listAll(postImagesRef);
  const images = await Promise.all(imagesList.items.map(async (image) => {
    const url = await getDownloadURL(image);
    return url;
  }));
  return images;
}

export const getPostThumbnail = async (postId: string): Promise<string> => {
  const storage = getStorage(app);
  const postImagesRef = ref(storage, `posts/${postId}/thumbnails`)
  const imagesList = await list(postImagesRef, { maxResults: 1 })
  if (imagesList.items.length > 0) {
    const url = await getDownloadURL(imagesList.items[0]);
    console.log(url)
    return url;
  } else {
    throw new Error("Post does not have a thumbnail")
  }
}

export const createPost = async (post: Post, files: File[]): Promise<DocumentReference> => {
  console.log("creating post")
  const postRef = collection(db, "posts");
  const postDoc = await addDoc(postRef, {
    userid: post.userid,
    caption: post.caption,
    flowers: post.flowers,
    date: serverTimestamp(),
  })

  const storage = getStorage(app);

  files.forEach(async (file, index) => {
    const postImagesRef = ref(storage, `posts/${postDoc.id}/${index}`);
    await uploadBytes(postImagesRef, file);
  });

  return postDoc
}

export const updatePost = async (post: Post): Promise<DocumentReference> => {
  const docRef = doc(db, "posts", post.id);
  await updateDoc(docRef, {
    caption: post.caption,
    flowers: post.flowers,
    likes: post.likes,
    comments: post.comments,
  });
  return docRef;
}

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  const q = query(collection(db, "posts", postId, "comments"), orderBy("date", "asc"));
  const comments = await getDocs(q);
  return comments.docs.map(doc => {
    const data = doc.data();
    const comment: Comment = {
      id: doc.id,
      userid: data.userid,
      postid: data.postid,
      message: data.message,
      date: data.date,
    };
    return comment as Comment;
  });
}

export const addPostComment = async (comment: Comment): Promise<DocumentReference> => {
  const docRef = doc(db, "posts", comment.postid);
  const commentRef = collection(docRef, "comments");
  const commentDoc = await addDoc(commentRef, {
    userid: comment.userid,
    postid: comment.postid,
    message: comment.message,
    date: serverTimestamp(),
  });
  return commentDoc;
}

export const deletePost = async (post: Post): Promise<void> => {
  const docRef = doc(db, "posts", post.id);
  await deleteDoc(docRef);

  const storage = getStorage(app);
  const postImagesRef = ref(storage, `posts/${post.id}`);
  const thumbnailsRef = ref(storage, `posts/${post.id}/thumbnails`);
  const imagesList = await listAll(postImagesRef);
  const thumbnailsList = await listAll(thumbnailsRef);

  for (const image of imagesList.items) {
    await deleteObject(image);
  }

  for (const thumbnail of thumbnailsList.items) {
    await deleteObject(thumbnail);
  }
}

// export async function getPostLikes(postId : string) {
//   const q = query(collection(db, "posts", postId, "likes"));
//   const likes = await getDocs(q);
//   return likes.docs.map(doc => doc.data());
// }

export async function userExists(userId : string) : Promise<boolean> {
  const docRef = doc(db, "users", userId)
  const userDoc = await getDoc(docRef);
  return userDoc.exists()
}

export async function getUser(userId : string) : Promise<User> {
  const docRef = doc(db, "users", userId)
  const userDoc = await getDoc(docRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const user: User = {
      id: userDoc.id,
      username: userData.username,
      email: userData.email || '',
      role: userData.role,
      bio: userData.bio || '',
      dateJoined: userData.dateJoined,
    }
    return user as User
  } else {
    throw new Error("User does not exist")
  }
}

export async function getUserPosts(userId : string) : Promise<Post[]> {
  const q = query(collection(db, "posts"), where("userid", "==", userId));
  const posts = await getDocs(q);
  return posts.docs.map(doc => {
    const data = doc.data();
    const post: Post = {
      id: doc.id,
      userid: data.author,
      caption: data.caption,
      flowers: data.flowers,
      likes: data.likes || [],
      comments: data.comments || [],
      date: data.date,
    };
    return post as Post;
  });
}

export const createPasswordUser = async (userData: User, password: string): Promise<DocumentReference> => {

  const auth = getAuth(app);
  const authUser = await createUserWithEmailAndPassword(auth, userData.email, password);
  
  userData.id = authUser.user.uid
  return await createUser(userData)
};

export const createUser = async (userData: User): Promise<DocumentReference> => {
  const ref = doc(db, "users", userData.id)
  await setDoc(ref, {
    username: userData.username,
    email: userData.email,
    role: userData.role,
    bio: userData.bio,
    dateJoined: serverTimestamp(),
  })
  return ref
}

export const editUser = async (userId: string, userData: Partial<User>): Promise<DocumentReference> => {
  const docRef = doc(db, "users", userId)
  await updateDoc(docRef, userData)
  return docRef
}

export const editUserProfilePic = async (userId: string, file: File): Promise<void> => {
  const storage = getStorage(app)
  const profilePicRef = ref(storage, `users/${userId}/profilePic`)
  await uploadBytes(profilePicRef, file)
}

export const deleteUser = async (userId: string): Promise<void> => {
  const docRef = doc(db, "users", userId)
  await deleteDoc(docRef)
};

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
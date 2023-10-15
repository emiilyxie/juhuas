import { getPostImages } from '@/lib/firebase';
import { Post } from '@/lib/types';
import React, { useEffect } from 'react';
import Image from 'next/image';

const PostGridItem = (props: { post: Post }) => {
  const { post } = props
  const [img, setImg] = React.useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const img = await getPostImages(post.id)
      setImg(img[0])
    })()
  }, [post.id])

  return (
    <div>
      <p>{post.caption}</p>
      {img && <Image src={img} alt={post.caption} width={300} height={300} />}
    </div>
  );
};

export default PostGridItem;

import { getPostImages, getPostThumbnail } from '@/lib/firebase';
import { Post } from '@/lib/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const PostGridItem = (props: { post: Post }) => {
  const { post } = props
  const [img, setImg] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try{
        const img = await getPostThumbnail(post.id)
        setImg(img)
      } catch (error) {
        console.error(error)
        // handle error here
      }
    })()
  }, [post.id])

  return (
    <div>
      <p>{post.caption}</p>
      {
      <div style={{width: '300px', height: '300px', position: 'relative'}}>
        { img ?
        <Image src={img} alt={post.caption} style={{objectFit: "cover"}} fill sizes='30vw'/> :
        <Image src='/mirrorsault.png' alt={post.caption} style={{objectFit: "cover"}} fill sizes='30vw' />
        }
      </div>}
    </div>
  );
};

export default PostGridItem;

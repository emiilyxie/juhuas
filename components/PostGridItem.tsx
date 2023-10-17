import { getPostThumbnail } from '@/lib/firebase';
import { Post } from '@/lib/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import layoutStyles from '@/app/layout.module.css'

const PostGridItem = (props: { post: Post }) => {
  const { post } = props
  const [img, setImg] = useState<string>("/placeholder.jpeg")

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
      <div className={layoutStyles.imgWrapper}>
        <Image src={img} alt={post.caption} style={{objectFit: "cover"}} fill sizes='30vw'/> :
      </div>
    </div>
  );
};

export default PostGridItem;

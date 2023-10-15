import { Post } from '@/lib/types';
import React from 'react';

const PostGridItem = (props: { post: Post }) => {

  const { post } = props

  return (
    <div>
      <p>{post.caption}</p>
    </div>
  );
};

export default PostGridItem;

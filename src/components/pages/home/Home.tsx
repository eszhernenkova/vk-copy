
import {Box} from '@mui/material';
import AddPost from './AddPost';
import { useState } from 'react';
import { IPost } from '../../../types';
import Posts from './Posts';
import { initialPosts } from './initialPosts';

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts)


  return (
    <div>
      <Box>
        <AddPost setPosts={setPosts} />
        <Posts posts={posts} />
      </Box>

    </div>
  )
}


export default Home
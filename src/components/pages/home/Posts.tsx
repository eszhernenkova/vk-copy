import React, { FC } from 'react'
import { IPost } from '../../../types'
import { Avatar, Box, ImageList, ImageListItem } from '@mui/material'
import { Link } from 'react-router-dom'

interface IPosts {
    posts: IPost[]
}

const Posts: FC<IPosts> = ({posts}) => {
  return (
  <> 
    {posts.map((post, index) => (
        <Box sx={{
            border: '1px solid #e2e2e2',
            borderRadius: '10px',
            padding: 2,
            marginTop: 4
        }}
            key={`Post-${index}`}
        >
            <Link 
            key={post.author._id}
            to={`/profile/${post.author._id}`} 
            style={{
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                color: '#111',
                marginBottom: 12,
            }}>
                <Box sx={{position: 'relative', marginRight: 2, borderRadius: '50%'}}>
                    <Avatar sx={{width: 46, height: 46, borderRadius: 3,}} src={post.author.avatar} alt="" />
                    {post.author.isInNetwork && 
                    <Box sx={{
                        backgroundColor:'#4FB14F', 
                        border: '2px solid #F1F7FA',
                        width: 12, 
                        height: 12, 
                        position: 'absolute', 
                        bottom: 0, 
                        right: 0,
                        borderRadius: '50%',
                    }}/>
                    }
                </Box>
                <div>
                    <div style={{fontSize: 14}}>{post.author.name}</div>
                    <div style={{fontSize: 14, opacity: '0.6'}}>{post.createdAt}</div>
                </div>
            </Link>
            <p>{post.content}</p>
            {post?.images?.length &&
            (
                <ImageList variant='masonry' cols={3} gap={8}>
                    {post?.images.map(image => (
                        <ImageListItem key={image}>
                            <img
                            src={image}
                            alt={''}
                            loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    ))}
    </>
  )   
}

export default Posts
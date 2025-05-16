import { Box, TextField } from '@mui/material'
import { FC, KeyboardEvent, useState } from 'react'
import { IPost, TypeSetState } from '../../../types'
import { useAuth } from '../../providers/useAuth'
import { addDoc, collection } from 'firebase/firestore'

interface IAddPost {
  setPosts: TypeSetState<IPost[]>
}

const AddPost: FC<IAddPost> = ({ setPosts }) => {
  const [content, setContent] = useState<string>('')
  const {user, db} = useAuth();

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && user)
      {
        try {
           await addDoc(collection(db, 'posts'), {
            author: user,
            content,
            createdAt: '5 минут назад'
          })
        } catch(e) {
          console.error('Error adding document', e)
        }

        setPosts(prev => [
          {
            author: user,
            content,
            createdAt: '5 минут назад'
          },
          ...prev, 
        ])
        setContent('')
      }
  } 

  return (
    <Box sx={{
        border: '1px solid #e2e2e2',
        borderRadius: '10px',
        padding: 2,
        marginTop: 4
    }}>
      <TextField 
        label='Расскажи, что у тебя случилось'
        variant='outlined'
        margin={'normal'}
        sx={{
          width: '100%',
        }}
        onChange={e => setContent(e.target.value)}
        value={content}
        onKeyDown={addPostHandler}
        slotProps={{
          input: {
            sx:{
              borderRadius: '25px',
              backgroundColor: '#F9F9F9'
            }
          }
        }}
      />

    </Box>
  )
}

export default AddPost
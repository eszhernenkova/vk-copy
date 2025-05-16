import  { FC, MouseEvent, useEffect, useState } from 'react'
import { useAuth } from '../../providers/useAuth'
import { IMessage } from '../../../types'

import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import Card from '../../ui/Card'
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from '@mui/material'

import {Send as SendIcon } from '@mui/icons-material'

const Messages: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [message, setMessage] = useState('')
  const { db, user } = useAuth()

  
  useEffect(() => {
      const unsub = onSnapshot(collection(db, 'messages'), (doc) => {
        const array: IMessage[] = []
          doc.forEach((d) => {
            array.push(d.data() as IMessage)
          })
          setMessages(array)
      })
  
      return () => {
        unsub()
      }
  }, [db])

  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (!user || !user._id) {
        console.error('User is not authenticated or user data is incomplete');
        return;
      }
      await addDoc(collection(db, 'messages'), {
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          isInNetwork: user.isInNetwork || false,
        },
        message,
      });
      setMessage(''); // Очищаем поле ввода
    } catch (e) {
      console.error('Error adding document', e);
    }
  };


  return (
    <Card>
      <List style={{ height: '65vh', overflow: 'auto' }}>
      {messages.map ((msg, index) => (
        <ListItem key={index} sx={{width: '100%'}}>
          <Grid container sx={msg.user._id === user?._id ? { textAlign: 'right', width: '100%' }: {}} >
            <Grid display={'flex'} justifyContent={msg.user._id === user?._id ?'flex-end' : 'flex-start'} size={12} >
              <Avatar sx={{ width: 30, height: 30 }} src={msg.user.avatar}/>
            </Grid>
            <Grid size={12} >
              <ListItemText sx={{ textAlign: 'right' }} primary={msg.message}/>
            </Grid>
            <Grid size={12}>
              <ListItemText style={{ textAlign: 'right' }} secondary={msg.user.name}/>
            </Grid>
          </Grid>
        </ListItem>

        ))}

      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid size={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(e)=> setMessage(e.target.value)} value={message}/>
        </Grid>
        <Grid size={1} sx={{ textAlign: 'right' }}>
          <Fab color="primary" onClick={addMessageHandler}><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Messages



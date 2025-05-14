import { Avatar, Button, Card, Chip } from '@mui/material'


import { useAuth } from '../../providers/useAuth'
import { logout } from '../../store/user.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store/store'

const User = () => {
    const {user} =useAuth()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/auth'); 
      };

  return (
    <Card 
        variant='outlined'
        sx={{
            padding: 2,
            backgroundColor: '#F1F7FA',
            border: 'none',
            borderRadius: 3,
            marginBottom: 5,
        }}
    >
        <Chip 
            avatar={<Avatar src={user?.avatar} />}
            label={user?.name}
            variant='outlined'
            sx={{display: 'flex', marginBottom: 2}}
        />
        <Button  variant='outlined' onClick={handleLogout}>Выйти</Button>
    </Card>
  )
}

export default User
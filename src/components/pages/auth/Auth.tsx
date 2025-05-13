import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material'
import  { SyntheticEvent, useState } from 'react'
import { IUserData } from './authTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { login, register } from '../../store/user.slice'

const Auth = () => {
  const [isRegForm, setIsRegForm] = useState(false)
    
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData)
  
  const dispatch = useDispatch<AppDispatch>()
  const {error, loading, email} = useSelector((state: RootState) => state.user)

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(isRegForm){
      dispatch(register(userData))
    } else {
      dispatch(login(userData))
    }
    setUserData({ email: '', password: '' })
  }

  return (
    <>
      {error &&  <Alert severity='error'>{error}</Alert>}
      <Grid sx={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
        <form onSubmit={handleLogin}>
            <TextField 
              type='email' 
              label='email' 
              variant='outlined' 
              value={userData.email} 
              onChange={e => setUserData({...userData, email: e.target.value})}
              required
              sx={{display: 'block', marginBottom: 3}}
            /> 
            <TextField 
              type='password' 
              label='password' 
              variant='outlined' 
              value={userData.password} 
              onChange={e => setUserData({...userData, password: e.target.value})}
              required
              sx={{display: 'block',  marginBottom: 3}}
            /> 
            <ButtonGroup variant='outlined'>
              <Button type='submit' onClick={()=> setIsRegForm(false)}>Auth</Button>
              <Button type='submit' onClick={()=> setIsRegForm(true)}>Register</Button>
            </ButtonGroup>
        </form>
      </Grid>
    </>
  )
}

export default Auth


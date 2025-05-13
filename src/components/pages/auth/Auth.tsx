import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import { IUserData } from './authTypes'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Auth = () => {
  const [isRegForm, setIsRegForm] = useState(false)
    
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData)
  const [error, setError] = useState('')
  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const auth = getAuth()

    if(isRegForm){
      try {
        await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      } catch (error) {
        if(error instanceof Error){
          error.message && setError(error.message)
        }
      }
      console.log('register')
    } else {
      console.log('auth')
    }

  //   try {
  //     await signInWithEmailAndPassword(auth, userData.email, userData.password)
  //   } catch (error) {
  //     if(error instanceof Error){
  //       error.message && setError(error.message)
  //     }
  //   }
  //   console.log('register')
  // } else {
  //   console.log('auth')
  // }
  //   console.log(userData.email, userData.password)
  //   setUserData({
  //     email: '',
  //     password: ''
  //   })

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


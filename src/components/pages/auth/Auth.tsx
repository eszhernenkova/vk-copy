import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material'
import  { SyntheticEvent, useEffect, useState } from 'react'
import { IUserData } from './authTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { login, register } from '../../store/user.slice'
import { useAuth } from '../../providers/useAuth'
import { useNavigate } from 'react-router-dom'


const Auth = () => {

  const { user } = useAuth()
  const navigate = useNavigate();

  const [isRegForm, setIsRegForm] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
    name: ''
  } as IUserData)
  
  const dispatch = useDispatch<AppDispatch>()

  const {error, loading, email} = useSelector((state: RootState) => state.user)

  // const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (userData.password.length < 6) {
  //     dispatch({ type: "user/setError", payload: "Пароль должен содержать минимум 6 символов" });
  //     return;
  //   }
  //   if (!userData.name.trim()) {
  //     dispatch({ type: 'user/setError', payload: 'Имя не может быть пустым' });
  //     return;
  //   }
  //   const result = await dispatch(register(userData)).unwrap(); // Ждём завершения
  //     if (result) {
  //       navigate('/'); // Редирект после успешной регистрации
  //     } else {
  //     const result = await dispatch(login(userData)).unwrap(); // Ждём завершения
  //     if (result) {
  //       navigate('/'); // Редирект после успешного входа
  //     }
  //   }
  //   setUserData({ email: '', password: '', name: '' })
  // }


  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password.length < 6) {
      dispatch({ type: 'user/setError', payload: 'Пароль должен содержать минимум 6 символов' });
      return;
    }
    if (!userData.name.trim() && isRegForm) {
      dispatch({ type: 'user/setError', payload: 'Имя не может быть пустым' });
      return;
    }

    try {
      if (isRegForm) {
        const result = await dispatch(register(userData)).unwrap();
        if (result) {
          navigate('/');
        }
      } else {
        const result = await dispatch(login(userData)).unwrap();
        if (result) {
          navigate('/');
        }
      }
    } catch (err: any) {
      if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        dispatch({ type: 'user/setError', payload: 'Этот email уже зарегистрирован. Попробуйте войти.' });
        const loginResult = await dispatch(login(userData)).unwrap();
        if (loginResult) {
          navigate('/');
        }
      } else if (err.message === 'Firebase: Error (auth/wrong-password).') {
        dispatch({ type: 'user/setError', payload: 'Неправильный пароль. Попробуйте снова.' });
      } else if (err.message === 'Firebase: Error (auth/user-not-found).') {
        dispatch({ type: 'user/setError', payload: 'Пользователь с таким email не найден.' });
      } else {
        dispatch({ type: 'user/setError', payload: err.message || 'Ошибка входа' });
      }
      console.error('Auth error:', err);
    }

    setUserData({ email: '', password: '', name: '' });
  };
  useEffect(() => {
    if(user) {
      navigate('/')
    } else if (!user && window.location.pathname !== '/auth') {
      navigate('/auth');
    }
  }, [user, navigate]);

  return (
    <>
      {error &&  <Alert severity='error'>{error}</Alert>}
      <Grid sx={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
        <form onSubmit={handleLogin}>
          <TextField 
            label='name' 
            variant='outlined' 
            value={userData.name} 
            onChange={e => setUserData({...userData, name: e.target.value})}
            sx={{display: 'block', marginBottom: 3}}
          /> 
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


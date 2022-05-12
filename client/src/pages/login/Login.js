import { useContext, useRef } from 'react'
import './login.css'
import axios from 'axios'
import { Context } from '../../context/Context'
import { Link, useLocation } from 'react-router-dom'

export default function Login() {
  const userRef = useRef()
  const path = useLocation()
  const passwordRef = useRef()
  const { dispatch, isFetching, user } = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      window.location.replace('/')
    } catch (e) {
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }
  console.log(user)
  console.log(path)
  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className='loginInput'
          type='text'
          placeholder='Enter your username...'
          ref={userRef}
        />
        <label>Password</label>
        <input
          className='loginInput'
          type='password'
          placeholder='Enter your password...'
          ref={passwordRef}
        />
        <button className='loginButton'>Login</button>
      </form>
      <button className='loginRegisterButton'>Register</button>
    </div>
  )
}

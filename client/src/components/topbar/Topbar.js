import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

export default function Topbar() {
  const { user, dispatch } = useContext(Context)
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className='top'>
      <div className='topLeft'>
        <i className='topIcon fab fa-facebook-square'></i>
        <i className='topIcon fab fa-twitter-square'></i>
        <i className='topIcon fab fa-pinterest-square'></i>
        <i className='topIcon fab fa-instagram-square'></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              ABOUT
            </Link>
          </li>

          <li className='topListItem'>
            <Link className='link' to='/'>
              CONTACT
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/newPost'>
              WRITE
            </Link>
          </li>
          <li className='topListItem'>
            <a className='link' href='' onClick={logout}>
              {user && 'LOGOUT'}
            </a>
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='link' to='/settings'>
            <img
              className='topImg'
              src={user?.profilePic ? user.profilePic.url : ''}
              alt=''
            />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
          </ul>
        )}
        <i className='topSearchIcon fas fa-search'></i>
      </div>
    </div>
  )
}

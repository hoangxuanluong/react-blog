import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import './singlePost.css'

export default function SinglePost() {
  const [post, setPost] = useState({})
  const [author, setAuthor] = useState({})
  const [update, setUpdate] = useState(false)
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const { user } = useContext(Context)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path)
      setPost(res.data)
      setAuthor(res.data.author)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  const handleDelete = async () => {
    const res = await axios.delete('/posts/' + path, {
      data: { username: user },
    })
    console.log(res)
    window.location.replace('/')
  }

  const handleUpdate = async (e) => {
    const res = await axios.put('/posts/' + path, {
      author,
      title,
      desc,
    })
    console.log(res)
    setUpdate(false)
  }

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo && <img className='singlePostImg' src={post.photo.url} />}
        <h1 className='singlePostTitle'>
          {update ? (
            <input
              type='text'
              className='singlePostTitleInput'
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            title
          )}

          {author.username === user?.username && (
            <div className='singlePostEdit'>
              <i
                className='singlePostIcon far fa-edit'
                onClick={() => setUpdate(true)}
              ></i>
              <i
                className='singlePostIcon far fa-trash-alt'
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
        <div className='singlePostInfo'>
          <span>
            Author:
            <b className='singlePostAuthor'>
              <Link className='link' to='/posts?username=Safak'>
                {author.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {update ? (
          <textarea
            rows='10'
            className='singlePostDescInput'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className='singlePostDesc'>{desc}</p>
        )}
        {update && (
          <button className='singlePostButton' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  )
}

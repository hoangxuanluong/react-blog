import { Link } from 'react-router-dom'
import './post.css'

export default function Post({ post }) {
  return (
    <div className='post'>
      {post.photo && <img className='postImg' src={post.photo.url} />}
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map((cat) => (
            <span className='postCat'>
              <a className='link' to='/posts?cat=Music'>
                {cat.name}
              </a>
            </span>
          ))}
        </div>
        <Link className='link' to={`post/${post._id}`}>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  )
}

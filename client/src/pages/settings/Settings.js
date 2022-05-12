import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Settings() {
  const { user, dispatch, error } = useContext(Context)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [image, setImage] = useState(user.profilePic)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_START' })
    try {
      const res = await axios.put('/users/' + user._id, {
        // ...user,
        userId: user._id,
        username,
        password,
        email,
        profilePic: image,
      })
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })
      setSuccess(true)
      console.log(res)
    } catch (e) {
      dispatch({ type: 'UPDATE_FAILURE' })
    }
    window.location.reload()
  }

  const handleImageUpload = async () => {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData()
    formData.append('file', files[0])
    // replace this with your upload preset name
    formData.append('upload_preset', 'my-uploads')
    const options = {
      method: 'POST',
      body: formData,
    }

    const res = await axios.post(
      'https://api.Cloudinary.com/v1_1/dahxl1611/image/upload',
      formData
    )

    setImage({
      url: res.data.url,
      filename: res.data.public_id,
    })
    console.log(files)
  }
  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsTitleUpdate'>Update Your Account</span>
          <span className='settingsTitleDelete'>Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img src={image?.url} alt='' />
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon far fa-user-circle'></i>{' '}
            </label>
            <input
              id='fileInput'
              name='image'
              type='file'
              style={{ display: 'none' }}
              className='settingsPPInput'
              onChange={handleImageUpload}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            name='name'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmitButton' type='submit'>
            Update
          </button>
          {success && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
            >
              Profile has been updated...
            </span>
          )}
          {error && (
            <span
              style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}
            >
              Something went wrong...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

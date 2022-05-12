import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { Context } from '../../context/Context'
import './write.css'

export default function Write() {
  const titleRef = useRef()
  const descRef = useRef()
  const [image, setImage] = useState({})
  const { user } = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/posts', {
      title: titleRef.current.value,
      desc: descRef.current.value,
      photo: image,
      author: user,
    })
    console.log(res)
    window.location.replace('/post/' + res.data._id)
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
    console.dir(formData)
  }
  return (
    <div className='write'>
      {image.url && <img className='writeImg' src={image.url} alt='' />}
      <form
        className='writeForm'
        encType='multipart/form-data'
        onSubmit={handleSubmit}
      >
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='writeIcon fas fa-plus'></i>
          </label>
          <input
            id='fileInput'
            name='image'
            type='file'
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <input
            className='writeInput'
            placeholder='Title'
            type='text'
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className='writeFormGroup'>
          <textarea
            className='writeInput writeText'
            placeholder='Tell your story...'
            type='text'
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className='writeSubmit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  )
}

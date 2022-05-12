const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
// const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require('path')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('DATABASE CONNECTED'))
  .catch((e) => console.log(e))

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
  res.send('HI')
})

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { message = 'Something went wrong', statusCode = '404' } = err
  res.status(statusCode).json(message)
})

app.listen(process.env.PORT || 5000, () => {
  console.log('ON PORT 5000')
})

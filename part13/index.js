const express = require('express')
require('express-async-errors');

const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readinglist')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)

// this has to be the last loaded middleware.
const errorHandler = (error, request, response, next) => {
  console.error('Error happened! ',error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'Databassovirhe! ' + error.message })
  } 

  // 13.9
  if (error.name === 'SequelizeValidationError') {
    console.error('Validation error!', error)
    return response.status(400).send({ error: 'Validation error! ' + error.message })
  }

  next(error)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
  })
}

start()
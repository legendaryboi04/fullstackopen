const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { sequelize } = require('../util/db')
const User = require('../models/user')
const { QueryTypes } = require('sequelize');

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ // haetaan käyttäjä käyttäjänimen perusteella
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password!'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  try {
    /* const reading = await ReadingList.create(req.body)
    res.json(reading) */
    await sequelize.query(
      `INSERT INTO active_sessions (token, username, name) VALUES ('${token}', '${user.username}', '${user.name}')`,
      { type: QueryTypes.INSERT })
  } catch(error) {
    return response.status(400).json({ error })
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
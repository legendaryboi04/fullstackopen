const { ReadingList } = require('../models/readinglist')

const router = require('express').Router()

const { Blog, User } = require('../models')
const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const { sequelize } = require('../util/db')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

// 13.10
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid!' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing!' })
  }
  next()
}

router.post('/', async (req, res) => {
  try {
    const results = await sequelize.query(
      `INSERT INTO readings (blog_id, user_id) VALUES (${req.body.blog_id}, ${req.body.user_id})`,
      { type: QueryTypes.INSERT })
    res.json(results)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// 13.22
router.put('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  // token tarkistus
  const headerToken = req.headers.authorization.substring(7)
  const results = await sequelize.query(
    `SELECT * FROM active_sessions WHERE token = '${headerToken}'`,
    { type: QueryTypes.SELECT }
  )

  if (!results.length) {
    throw Error('Token väärin tai puuttuu!')
  }

  try {

    if (req.blog && req.blog.userId === req.decodedToken.id) {
      console.log('okei!');
      req.blog.read = req.body.read;
      await req.blog.save()
      res.json(req.blog)
      res.status(204).end()
    }
    else {
      console.log('token failure!');
      res.status(400).end()
    }
    
  } catch(error) {
    next(error)
    //return res.status(400).json({ error })
  }
})
module.exports = router
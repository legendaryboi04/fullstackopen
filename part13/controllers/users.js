const router = require('express').Router()

const { User, Blog } = require('../models')
//const Readings = require('../models/readings')

// 13.8 List all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { // join query
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

// 13.8 add new user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    console.log('EpäOnnistui!',error);
    next(error)
  }
})

// 13.8 change users name
router.put('/:username', async (req, res) => {
  const username = req.body.username
  try {
    const user = await User.findOne({ // haetaan käyttäjä käyttäjänimen perusteella
      where: {
        username: req.params.username
      }
    })
    user.username = username;
    await user.save()
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// 13.23
/*
req.query.read === true / false
*/
router.get('/:id', async (req, res) => {
  let where = {}

  if (req.query) {
    where = req.query
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] } ,
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog, // vastaa esimerkin marked_notes
        where,
        as: 'user_readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
        through: {
          attributes: []
        },
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'readed_blogs',
            through: {
              attributes: ['id']
            }
          }
        ]
      },
    ]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
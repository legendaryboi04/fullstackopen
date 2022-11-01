const router = require('express').Router()
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../util/db')

router.delete('/', async (request, response) => {
  await sequelize.query(
    `DELETE FROM active_sessions`,
    { type: QueryTypes.DELETE }
  )
  response.status(200).json({active_sessions: "successfulley cleared!"}).end()
})

module.exports = router
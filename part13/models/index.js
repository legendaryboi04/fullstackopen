const Blog = require('./blog')
const User = require('./user')
//const ReadingList = require('./readinglist')
const UserReadings = require('./userreadings')

// määritellään foreign key
// one-to-many suhde User ja Blog välillä - yhdellä userilla monta blogea
User.hasMany(Blog)
Blog.belongsTo(User)
//Blog.sync({ alter: true }) 
//User.sync({ alter: true })
User.belongsToMany(Blog, { through: UserReadings, as: 'user_readings' }) //assosiaaito
Blog.belongsToMany(User, { through: UserReadings, as: 'readed_blogs' })

module.exports = {
  Blog, User, UserReadings
}
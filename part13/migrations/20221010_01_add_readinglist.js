const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      read: { // onko kirja luettu vai ei
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        //references: { model: 'blogs', key: 'id' },
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readings')
  },
}
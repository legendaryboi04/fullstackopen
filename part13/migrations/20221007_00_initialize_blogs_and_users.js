const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      year: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1991,
          max: 2022
        }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {
      timestamps: true
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { // 13.9
          isEmail: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      disabled: { // 13.24
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {
      timestamps: true
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      timestamps: true
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}
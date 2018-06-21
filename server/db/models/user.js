const db = require('../models/index');
const Sequelize = require('sequelize');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  githubId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

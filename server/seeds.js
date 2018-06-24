const User = require('./db/models/user')
const db = require('./db/db')

// Helpers functions
const floor = function (random) {
  return Math.floor(random);
}

const random = function (min = 0, max) {
  return (Math.random() * ( max - min + 1 )) + min;
}

// Database seed
db
	.sync({ force: true })
	.then(() => {
    return User.create({
      name: 'Michael McDevitt',
      email: 'mmcdevi1@gmail.com',
      githubId: 'mmcdevi1'
    })
	})
	.then(() => {
		console.log('[SUCCESS]: Database synced successfully.')
	})
	.catch(err => {
		console.log('[ERROR]: Database not synced successfully.')
		console.log(err)
	})
	.finally(() => {
		db.close()
	})

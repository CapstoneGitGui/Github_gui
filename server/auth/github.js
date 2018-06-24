const passport = require('passport')
const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


// Github authentication and login (GET /auth/github)
router.get('/', passport.authenticate('github', { scope: 'email' }));

// router.get('/', passport.authenticate('github', { scope: 'email' }));

// handles the callback after Gihub has authenticated the user (GET /auth/google/callback)
router.get('/callback',
  passport.authenticate('github', {
    successRedirect: '/home', // or wherever
    failureRedirect: '/' // or wherever
  })
)

const GithubStrategy = require('passport-github').Strategy;

passport.use(
  new GithubStrategy({
    clientID: 'fb74e5d5d3978c4d6c87',
    clientSecret: '9067dcb77f4aad174472cc1a62b2d3b16908f520',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  // Google will send back the token and profile
  async (token, refreshToken, profile, done) => {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
   const userLogin = await User.findOrCreate({ where: {githubId: profile.id}})

   done(null, userLogin);
  })
)

passport.serializeUser((user, done) => {
  // __________
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  //
  try {
  await User.findById(id)
  } catch (err) {
    done(err)
  }

});



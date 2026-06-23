const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

module.exports = function setupPassport() {
  const googleClientID = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'

  if (!googleClientID || !googleClientSecret) {
    console.warn('Google OAuth disabled: missing GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET')
    return
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase()
          if (!email) {
            return done(new Error('Google account does not contain an email address.'))
          }

          let user = await User.findOne({ email })
          if (user) {
            user.googleId = user.googleId || profile.id
            user.profileImage = user.profileImage || profile.photos?.[0]?.value
            user.provider = 'google'
            await user.save()
            return done(null, user)
          }

          user = new User({
            name: profile.displayName || email,
            email,
            googleId: profile.id,
            profileImage: profile.photos?.[0]?.value,
            provider: 'google',
          })

          await user.save()
          return done(null, user)
        } catch (error) {
          done(error)
        }
      },
    ),
  )

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

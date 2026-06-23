const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/User')

const router = express.Router()
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
const googleCallbackStore = new Map()


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Name, email and password are required.' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await User.findOne({ 
      email: normalizedEmail 
    })

    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.provider === 'google'
            ? 'Email already registered with Google. Please use Google login.'
            : 'Email already in use.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      provider: 'local',
    })

    await user.save()

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
        provider: user.provider,
      },
    })

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create account.' 
    })
  }
})



router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body


    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required.' 
      })
    }


    const normalizedEmail = email.toLowerCase().trim()


    const user = await User.findOne({ 
      email: normalizedEmail 
    })


    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password.' 
      })
    }


    if (user.provider === 'google') {

      return res
        .status(401)
        .json({ 
          error: 'This account is managed by Google. Please sign in with Google.' 
        })

    }


    const passwordMatch = await bcrypt.compare(
      password,
      user.password || ''
    )


    if (!passwordMatch) {

      return res.status(401).json({ 
        error: 'Invalid email or password.' 
      })

    }


    // Always require 2FA after successful login.
    res.json({
      require2FA: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
        provider: user.provider,
        twoFactorEnabled: user.twoFactorEnabled === true,
      },
    })


  } catch (error) {

    res.status(500).json({ 
      error: 'Failed to login.' 
    })

  }

})



router.get('/google', (req, res, next) => {

  const isGoogleConfigured =
    !!process.env.GOOGLE_CLIENT_ID &&
    !!process.env.GOOGLE_CLIENT_SECRET


  if (!isGoogleConfigured) {

    return res.redirect(
      `${frontendUrl}/login?google_error=1`
    )

  }


  passport.authenticate('google', {

    scope: ['profile', 'email'],

    prompt: 'select_account',

  })(req, res, next)

})



router.get('/google/callback',

  passport.authenticate(
    'google',
    {
      session: false,
      failureRedirect: `${frontendUrl}/login?google_error=1`,
    }
  ),

  (req, res) => {
    const user = req.user
    if (!user) {
      return res.redirect(`${frontendUrl}/login?google_error=1`)
    }

    console.log('Google user:', user)

      const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      profileImage: user.profileImage || null,
      twoFactorEnabled: user.twoFactorEnabled === true,
    }

    const token = crypto.randomBytes(16).toString('hex')
    console.log('Google callback successful, forwarding token to frontend:', token)
    googleCallbackStore.set(token, payload)
    setTimeout(() => googleCallbackStore.delete(token), 5 * 60 * 1000)

    res.redirect(`${frontendUrl}/auth/callback?token=${token}`)
  },
)

router.get('/google/session', (req, res) => {
  try {
    const token = req.query.token
    if (!token) {
      return res.json({ success: false, user: null })
    }

    const user = googleCallbackStore.get(token)
    if (!user) {
      return res.json({ success: false, user: null })
    }

    googleCallbackStore.delete(token)
    return res.json({ success: true, user })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
})

router.get('/failure', (req, res) => {
  res.redirect(`${frontendUrl}/login?google_error=1`)
})

router.put('/profile/update', async (req, res) => {
  try {
    const { userId, selectedAvatar } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { selectedAvatar: selectedAvatar || null },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
        selectedAvatar: user.selectedAvatar || null,
        provider: user.provider,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

module.exports = router
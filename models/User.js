const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { 
    type: String 
  },

  googleId: { 
    type: String 
  },

  profileImage: { 
    type: String 
  },

  selectedAvatar: {
    type: String,
    default: null
  },

  provider: { 
    type: String, 
    required: true,
    enum: ['local', 'google'],
    default: 'local'
  },


  // 2FA fields

  twoFactorEnabled: {
    type: Boolean,
    default: false
  },

  twoFactorSecret: {
    type: String,
    select: false
  }


}, {
  timestamps: true,
})


module.exports = mongoose.model('User', userSchema)

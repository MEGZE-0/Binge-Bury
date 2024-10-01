const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    profilePicture: { type: String, default: 'default_profile_pic.png' },
    bio: { type: String, maxlength: 250 },
    location: { type: String },  // Add location field here
    phone: { type: String },     // Add phone field here
    dateJoined: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    roles: { type: [String], enum: ['user', 'admin'], default: ['user'] }
  });
  

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, roles: this.roles }, process.env.JWT_SECRET);
};

// Method to update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = Date.now();
  return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;

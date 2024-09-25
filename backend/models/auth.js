const mongoose = require('mongoose'); // Import mongoose

const authSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    email: { type: String, required: true },
    hashed_password: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  const Auth = mongoose.model('Auth', authSchema);
  
  module.exports = Auth; // Export the model

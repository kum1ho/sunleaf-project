const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function signToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

function verifyToken(token) {
  try { 
    return jwt.verify(token, process.env.JWT_SECRET); 
  } catch { 
    return null; 
  }
}

async function verifyPassword(plain, hash) {
  try {
    return await bcrypt.compare(plain, hash);
  } catch (error) {
    console.error('[AUTH] Password verification error:', error);
    return false;
  }
}

module.exports = { signToken, verifyToken, verifyPassword };

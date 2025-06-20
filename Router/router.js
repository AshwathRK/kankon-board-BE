const { verifyRefreshToken } = require('../utill')

const express = require('express');
const {
  handleGetLogin,
  handleGetSignUp,
  handlePostLogin,
  handlePostSignUp,
  getUserDetails,
  logoutUser
} = require('../Controller/userregister');

const {
  resetPassword,
  verifyOtp,
  sendResetOtp
} = require('../Controller/passwordreset');

const router = express.Router();

// Authentication routes
router.get('/', handleGetLogin);
router.post('/', handlePostLogin);
router.get('/signup', handleGetSignUp);
router.post('/signup', handlePostSignUp);
router.get('/user', getUserDetails);
router.get('/logout', logoutUser);

// Password Reset routes
router.post('/sendresetotp', sendResetOtp);
router.post('/verifyotp', verifyOtp);        
router.post('/resetpassword', resetPassword);  

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Page not found (404)"
  });
});

module.exports = router;

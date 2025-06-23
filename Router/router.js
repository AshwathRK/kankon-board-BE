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

const {handleGetAllProjectsbyuser, handleCreateProject, handleUpdateProject, handleDeleteProject} = require('../Controller/project')

const { getAllToDoTaskData, getAllinprogressTaskData, getAllDoneTaskData, handleCreateTaskData } = require('../Controller/taskdata');
const verifyTokenfromCookies = require('../Middleware/auth');


const router = express.Router();

// Authentication routes
router.get('/', verifyTokenfromCookies, handleGetLogin);
router.post('/', handlePostLogin);
router.get('/signup', handleGetSignUp);
router.post('/signup', handlePostSignUp);
router.get('/user', verifyTokenfromCookies, getUserDetails);
router.get('/logout', logoutUser);

// Password Reset routes
router.post('/sendresetotp', sendResetOtp);
router.post('/verifyotp', verifyOtp);
router.post('/resetpassword', resetPassword);

// Project creation
router.get('/projects/:userID', handleGetAllProjectsbyuser);
router.post('/projects', handleCreateProject);
router.put('/projects/:id', handleUpdateProject);
router.delete('/projects/:id', handleDeleteProject);


// Task routes
router.get('/todotask/:projectId', getAllToDoTaskData);
router.get('/inprogressTask/:projectId', getAllinprogressTaskData);
router.get('/doneTask/:projectId', getAllDoneTaskData);
router.post('/createTask', handleCreateTaskData);

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Page not found (404)"
  });
});

module.exports = router;

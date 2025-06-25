const express = require('express');
const {
  handleGetLogin,
  handleGetSignUp,
  handlePostLogin,
  handlePostSignUp,
  getUserDetails,
  handleUpdateUser,
  logoutUser
} = require('../Controller/userregister');

const {
  resetPassword,
  verifyOtp,
  sendResetOtp
} = require('../Controller/passwordreset');

const {handleGetAllProjectsbyuser, handleCreateProject, handleUpdateProject, handleDeleteProject} = require('../Controller/project')
const { getAllTaskData, handleCreateTaskData, handleUpdateTaskData, handleDeleteTask } = require('../Controller/taskdata');
const {handleGetStatus, handleCreateStatus, handleUpdateStatus, handleDeleteStatus} = require('../Controller/status')
const verifyTokenfromCookies = require('../Middleware/auth');


const router = express.Router();

// Authentication routes
router.get('/', verifyTokenfromCookies, handleGetLogin);
router.post('/', handlePostLogin);
router.get('/signup', handleGetSignUp);
router.post('/signup', handlePostSignUp);
router.get('/user', verifyTokenfromCookies, getUserDetails);
router.patch('/user', verifyTokenfromCookies, handleUpdateUser);
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

// Status routes
router.get('/status/:projectId', handleGetStatus); 
router.post('/status', handleCreateStatus);
router.patch('/status/:id', handleUpdateStatus);
router.delete('/status/:id', handleDeleteStatus);

// Task routes
router.get('/alltask/:projectId', getAllTaskData);
router.post('/createTask', handleCreateTaskData);
router.patch('/tasks/:taskId', handleUpdateTaskData);
router.delete('/tasks/:taskId', handleDeleteTask);


// 404 handler
router.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Page not found (404)"
  });
});

module.exports = router;

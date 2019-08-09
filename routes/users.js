// Require constants, routers, verifyToken, controllers
const
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js');
    // verifyToken = require('../middleware/authenticate')

// Public routes
    // Users Index (get all users);

    // User Post (create new user) / User Sign up:

    // User Login:

// Middleware to verify user has a valid token before showing subsequent requests/routes:
// usersRouter.use(verifyToken);

// Protected/Hidden Routes
    // Show 1 user (User home page?);

    // Update/Edit User

    // Delete/Destroy User

    
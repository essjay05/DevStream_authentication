// Require dotenv
require('dotenv').config();
// Require constants
const
    express = require('express'),
    app = express(),
    User = require('./models/user'),
    authenticate = require('./middleware/authenticate'),
    bodyParser = require('body-parser'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    hbs = require('hbs'),
    PORT = process.env.PORT || 3000;

// Connect database
require('./db/mongoose');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public/views'));

<<<<<<< HEAD

// app.use((req, res, next) => {
//     app.locals.currentUser = req.user;
//     app.locals.loggedIn = !!req.user;

//     next();
// });
=======
app.set('view engine', 'hbs');

>>>>>>> master
// Routes
    
    // ROOT/HOME ROUTE:
    app.get('/', (req, res) => {
        res.render('index')
    })
    // API Root Route
    app.get('/api', (req, res) => {
        res.json({ message: `API Root Route`})
    });

    
    
    
    
    
    // ROUTES

    // Use USERS ROUTES
    const usersRouter = require('./routes/users.js')
    app.use('/users', usersRouter);

    // Authenticate route
    app.get('/about', authenticate, (req, res) => {
        res.sendFile(path.join(__dirname, '/public/views/about.html'));
    })

    // USER Routes
        // Create user Route
        app.post('/users/create', async (req, res) => {
            console.log(req.body);
            
            let user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password
            });

            try {
                const savedUser = await user.save();
                res.status(200).send(savedUser);
            } 
            catch (err) {
                res.status(404).send(err);
                console.log(err);
            }
        })

        // Update User Route
        // UPDATE User
        app.patch('/users/:id/edit', async (req, res) => {
            console.log(`User to be updated: ${req.params.id}`);
    
            try {
                const foundUser = await User.findOneAndUpdate({_id: req.params.id}, 
                    {
                        email: req.body.email,
                        password: req.body.password
                    });
                const updatedUser = await foundUser.save();
                res.status(200).send(`Successfully updated: ${foundUser} to ${updatedUser}`);
            } catch (err) {
                res.status(400).send(err);
                console.log(err);
            }    
        });
 

        // User Login Route
        app.post('/users/login', async (req, res) => {
            console.log(`Finding user email and password for login`);
            
            try {
                const user = await User.findByCredentials(req.body.email, req.body.password);
                    console.log(` This is my user found: ${user}`);
                const createdToken = await user.generateAuthToken();

                res.status(200).header('x-auth', createdToken).send(user);
            } catch (error) {
                res.status(400).send({errorMsg: error});
                console.log(error);
            }
        })
        // Viewing User data on an html page
        app.get('/user/:username', async (req, res) => {
            console.log(req.params.username);
            
            try {
                const foundUser = await User.findOne({ username: req.params.username })
                console.log(foundUser);
                res.render('user.hbs', {
                username: foundUser.username,
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName
                })
            } catch (err) {
                res.status(404).send(`<h2> No person with the username ${req.params.username} found.</h2>`);
            }
        })

// Listening on Port
app.listen(PORT, err => {
    console.log( err || `Server listening on PORT ${PORT}`)
})



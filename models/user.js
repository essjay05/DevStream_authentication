// Require mongoose and jwt, and bcryptjs to create model
const 
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

// Create new userSchema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    firstName: {
        type: String,
        minlength: 1
    },
    lastName: {
        type: String,
        minlength: 1
    },
    username: { 
        type: String,
        minlength: 4,
        uniqe: true 
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true}) 

// Creating method to generate authToken
UserSchema.methods.generateAuthToken = async function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
    
    // Adding access and token variables to our user.tokens array
    user.tokens = user.tokens.concat([{ access, token }]);
    
    // Await the result of the user.save function
    const savedToken = await user.save();

    return token;
};

// FindByToken method
UserSchema.statics.findByToken = async function(token) {
    let User = this;
    var decoded;

    try {
        decoded = jwt.verify( token, process.env.JWT_SECRET );
    } catch (err) {
        return Promise.reject();
        console.log(err);
    }

    try {
        const foundUser = await User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
        
        return foundUser;
    } catch (err) {
        return Promise.reject();
        console.log(err);
    }
};

// Static method to allow to find user by email or password:
UserSchema.statics.findByCredentials = async function(email, password) {
    let User = this;
    
    try {
        const foundUser = await User.findOne({ email });
        // if NOT found
        if (!foundUser) {
            return Promise.reject();
        } 
        const matchedPw = await foundUser.comparePassword(password);
            console.log(`matchedPw: ${matchedPw}`);
            console.log(`foundUser: ${foundUser}`);
            return Promise.resolve(foundUser);
    } catch (err) {
        return Promise.reject();
        console.log(err);
    }
}

// Compare hashed user password to allow user to login if match
UserSchema.methods.comparePassword = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    if (!match) {
        console.log(`Password is invalid.`)
        return Promise.reject();
    } console.log(`comparePassword match is: ${match}`)
    console.log(`Success! Password is a match!`)
    return Promise.resolve(match);
}

UserSchema.pre('save', function(next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

// Export constant to be used everywhere
const User = mongoose.model('User', UserSchema);

module.exports = User;


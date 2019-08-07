// Require mongoose to create model
const mongoose = require('mongoose');

// Create new userSchema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
}, {timestamps: true})

// Static method to allow to find user by email or password:
UserSchema.statics.findByCredentials = async function(email, password) {
    let User = this;
    
    // Create foundUser variable that awaits the found one using the email or password
    try {const foundUser = await User.findOne({ email: email, password: password });
        // if NOT found
        if (!foundUser) {
            return Promise.reject();
        } 
        return Promise.resolve(foundUser);
    } catch (err) {
        return Promise.reject(err);
    }

}

// Export constant to be used everywhere
const User = mongoose.model('User', UserSchema);

module.exports = User;
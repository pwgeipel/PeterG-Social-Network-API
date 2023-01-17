const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
},{
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Must be a valid email address."],
    }
},{
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }]
},{
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
})

userSchema.virtual("friendCount").get(function() {
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User;
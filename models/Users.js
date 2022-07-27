const { Schema, model, } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: String,
        ref: 'Thoughts'
    }],
    friends: [{
        type: String,
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

UserSchema.virtual('friendTotal').get(function() {
    return this.friends.length;
})

const Users = model('User', UserSchema);

module.exports = Users;
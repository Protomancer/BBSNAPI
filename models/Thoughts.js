const { Schema, Model, Types } = require('mongoose');

const moment = require('moment');

const ReactSchema = new Schema(
    {
    //custom id
    reactId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactBody: {
        type: String,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMM DD,YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getter: true
    }
    }
);

const ThoughtSchema = new Schema(
{
    thoughtTexts: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reaction: [ReactSchema]
},
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

ThoughtSchema.virtual('reactCount').get(function() {
    return this.reaction.length;
});
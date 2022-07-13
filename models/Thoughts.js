const { Schema, model, Types } = require('mongoose');


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

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;
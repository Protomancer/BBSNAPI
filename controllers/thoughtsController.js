const {Thoughts, Users} = require('../models');
// Thought controller setup
const thoughtControl = {
//Create new thoughts
    thoughtsCreate({params, body}, res) {
        Thoughts.create(body)
        .then((userDbData) => {
            return Users.findOneAndUpdate({ _id: params._id}, {$push: {thoughts: userDbData._id }}, {new:true});
        })
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json({message: 'Invalid Thought'});
                return;
            }
            res.json(thoughtsDbData)
        })
        .catch(err => res.json(err));
    },
//get all thoughts
    thoughtsGather(req,res) {
        Thoughts.find({})
        .populate({path: 'reaction', select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => res.json(thoughtsDbData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
// use id to find thoughts
    thoughtsGatherById({params},res) {
        Thoughts.findOne({_id: params.id })
        .populate({path: 'reaction',select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json('Invalid Thought ID');
                return;
            }
            res.json(thoughtsDbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
//update a thought
    thoughtsUpdate({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params._id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json({message: 'Invalid Thought ID'});
                return;
            }
            res.json(thoughtsDbData);
        })
        .catch(err => res.json(err));
    },
// delete a thought by id
    thoughtsDelete({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json({message: 'Invalid Thought ID'});
                return;
            }
            res.json(thoughtsDbData);
        })
        .catch(err => res.status(400).json(err));
    },
// create a reaction
    reactionCreate({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.reactId}, {$push: {reaction: body}},{new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => {
            if (!thoughtsDbData) {
                res.status(404).json({message: 'Invalid Reaction ID'});
                return;
            }
            res.json(thoughtsDbData);
        })
        .catch(err => res.status(404).json(err))
    },
// delete reactions
    reactionDelete({params}, res) {
        Thoughts.findOneAndDelete({_id: params.reactId}, {$pull:{reaction: {reactId :params.reactId}}},{new: true})
        .then(thoughtsDbData => {
            if (!thoughtsDbData) {
                res.status(404).json({meassage: 'Invalid Reaction ID'});
                return;
            }
            res.json(thoughtsDbData);
        })
        .catch(err => res.status(404).json(err))
    }
};

module.exports = thoughtControl;
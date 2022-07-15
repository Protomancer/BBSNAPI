const {Thoughts, Users} = require('../models');

const thoughtControl = {

    thoughtsCreate({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts:_id}}, {new:true});
        })
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json({message: 'Invalid Thought ID'});
                return;
            }
            res.json(thoughtsDbData)
        })
        .catch(err => res.json(err));
    },

    thoughtsGather(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => res.json(thoughtsDbData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    thoughtsGatherById({params},res) {
        Thoughts.findOne({_id: params.id })
        .populate({path: 'reaction',select: '-__v'})
        .select('-__v')
        .then(thoughtsDbData => {
            if(!thoughtsDbData) {
                res.status(404).json({'Invalid Thought ID'});
                return;
            }
            res.json(thoughtsDbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    thoughtsUpdate({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
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
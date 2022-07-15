const { Users } = require("../models");

const userControl = {
  userCreate({ body }, res) {
    Users.create(body)
      .then((userDbData) => res.json(userDbData))
      .catch((err) => res.status(400).json(err));
  },

  userGatherAll(req, res) {
    Users.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__V")
      .then((userDbData) => res.json(userDbData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  userGatherById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({ message: "Invalid User ID" });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  userUpdate({ params, body }, res) {
    Users.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({
            message: "Invalid User ID",
          });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.json(err));
  },

  userDelete({ params }, res) {
    Users.findOneAndDelete({
      _id: params.id,
    })
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({
            message: "Invalid User ID",
          });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addAFriend({ params }, res) {
    Users.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $push: {
          Friends: params.friendsId,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({
            message: "Invalid User Id",
          });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.json(err));
  },

  deleteAFriend({params},res)
  {
    Users.findOneAndDelete(
        {
            _id: params.id
        },
        {
            $pull:
            {
                friends:params.friendsId
            }
        },
        {
            new: true
        }
    )
    .populate(
        {
            path: 'friends', select: '-__v'
        }
    )
    .select('-__v')
    .then(userDbData =>{
        if(!userDbData) {
            res.status(404).json({
                message: 'Invalid User ID'
            });
            return;
        }
        res.json(userDbData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = userControl;
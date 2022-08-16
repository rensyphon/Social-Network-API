const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
            new: true, runValidators: true
        })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : console.log("User found.")
        )
        .then(() => res.json({ message: 'User updated!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : console.log("User found.")
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {$push: { friends: req.params.friendId } }, {
            new: true, runValidators: true
        })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {$pull: { friends: req.params.friendId } }, {
            new: true, runValidators: true
        })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        ).catch((err) => res.status(500).json(err));
    }
  };
  
const { Thought, User } = require('../models');

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // get single thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .sort({ createdAt: -1 })
      .then((thoughtData) => 
        !thoughtData
         ? res.status(404).json({ message: 'No thought with that id!' })
        :  res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created; no user with that id.' });
        }

        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought with that id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought with that id!' });
        }

        // remove thought id from user's `thoughts` field
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created; no user with that id.' });
        }
        res.json({ message: 'Thought deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a reaction to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought with that id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove reaction from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought with that id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
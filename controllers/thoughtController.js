const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'ID does not match any thoughts'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create({thought: req.body.thought, user: req.body.user})
            .then((thought) => {
                console.log(thought._id)
                return User.findOneAndUpdate(
                    { user: req.body.user },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
            console.log(user)
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Post created without user ID'})
                    : res.json('Post created')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
        )
        .then((user) => 
            !user
              ? res.status(404).json({ message: 'Thought created but no user found'})
              : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
        .then((thought) => 
          !thought
            ? res.status(404).json({ message: 'No thought with this Id' })
            : res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    }
};
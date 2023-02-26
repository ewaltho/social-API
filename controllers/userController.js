const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .populate('thoughts')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'ID does not match user.'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'User created' })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'No user with this Id' })
            : res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    }
}
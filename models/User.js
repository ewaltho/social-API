const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, validate:[validateEmail, "Please enter a valid email address."] },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;

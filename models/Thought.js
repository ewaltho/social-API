const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thought: { type: String},
        createdAt: { type: Date, default: Date.now },
    }, 
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
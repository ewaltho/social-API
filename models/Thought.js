const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thought: { type: String, required: true, minLength:1, maxLength: 280},
        createdAt: { type: Date, default: Date.now },
        user: { type: String },
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
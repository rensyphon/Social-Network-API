const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('date-format');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate('MM/dd/yyyy', timestamp)
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );
  thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;
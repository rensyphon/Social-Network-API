const { Schema, Types, model } = require('mongoose');
const formatDate = require('date-format');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate('MM/dd/yyyy', timestamp)
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  
  module.exports = reactionSchema;
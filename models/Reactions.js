const { Schema, model, Types } = require("mongoose");

const Thoughts = require('./Thoughts');

const ReactSchema = new Schema(
    {
      reactId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 75,
      },
      username: { 
        type: String,
        required: true,
        },
      createdAt: {
        type: Date, 
        default: Date(),
      }
    },
    {
    toJSON: {
        virtuals: true,
        },
        id: false,
    }
);

const Reactions = model("Reactions", ReactSchema);

module.exports = Reactions;

const { Schema, model, Types } = require("mongoose");

const ReactSchema = new Schema(
    {
      reactId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactBody: {
        type: String,
      },
      userReact: { 
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

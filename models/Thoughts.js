const { Schema, model, Types } = require("mongoose");

const Reactions = require('./Reactions');


const ThoughtSchema = new Schema(
  {
    thoughtTexts: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [
      {type: Schema.Types.ObjectId,
      ref: 'Reactions'
    }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactCount").get(function () {
  return this.reaction.length;
});

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thoughts;

import { Schema, Types }  from 'mongoose';


export const commentSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    author: {
      type: String,
      default: "Anônimo",
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

export const suggestionSchema = new Schema({
  "name": String,
  "suggestion": String,
  "date": Date,
  "type": String,
  "vote": Number,
  "comments": {
    type: [commentSchema],
    default: []
  }
});

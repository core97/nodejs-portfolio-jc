const mongoose = require('mongoose');

const { Schema } = mongoose;
const today = new Date();

const postSchema = new Schema(
  {
    title: { type: String, trim: true, lowercase: true, required: true },
    content: { type: String, required: true },
    summary: {type: String, required: true },
    dateCreation: { type: String, default: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` },
    image: { type: String, trim: true, required: true }, // @TODO: put default image
    views: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: [
      {
        type: String,
        enum: [
          'angular',
          'react',
          'nodejs',
          'git',
          'docker',
          'mysql',
          'mongodb',
          'javascript',
          'typescript',
        ],
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;

        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;

        return ret;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

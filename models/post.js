const mongoose = require('mongoose');

const { Schema } = mongoose;
const today = new Date();

const userSchema = new Schema(
  {
    title: { type: String, trim: true, lowercase: true, required: true },
    content: { type: String, required: true },
    dateCreation: { type: String, default: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` },
    image: { type: String, trim: true, required: true }, // put default image
    likes: { type: Number, default: 0 },
    idUser: { type: mongoose.Types.ObjectId, ref: 'User' },
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

const User = mongoose.model('Post', userSchema);
module.exports = User;

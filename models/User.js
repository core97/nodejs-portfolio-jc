const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, trim: true, lowercase: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true }, // Lorem ipsum like default
    avatar: { type: String, trim: true, required: true }, // @TODO: put default image
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

userSchema.virtual('ownerPost', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
});

const User = mongoose.model('User', userSchema);
module.exports = User;

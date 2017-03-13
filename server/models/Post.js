import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const postSchema = new Schema({
  title: { type: String, required: true},
  description: String,
  body: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  _creator: { type: Schema.ObjectId, ref: 'User' },
  _category: { type: Schema.ObjectId, ref: 'Category' },
  _comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model('Post', postSchema);
export default Post;

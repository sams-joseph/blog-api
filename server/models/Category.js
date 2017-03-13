import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const categorySchema = new Schema({
  name: { type: String, required: true},
  isDeleted: { type: Boolean, default: false },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

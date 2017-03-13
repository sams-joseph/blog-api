import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: [5, 'Email must be 5 characters or more.'],
  },
  createdAt: { type: Date, default: Date.now },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;

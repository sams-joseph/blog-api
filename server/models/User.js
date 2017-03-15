import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: [6, 'Email must be 6 characters or more.'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be 8 characters or more.'],
  },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

userSchema.methods.createUser = function() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if(err) reject(err);
        this.password = hash;
        this.save(resolve(this));
      });
    });
  });
};

userSchema.methods.loginUser = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password).then((res) => {
      if(!res) reject('Pasword invalid');
      resolve(res);
    });
  });
};


const User = mongoose.model('User', userSchema);
export default User;

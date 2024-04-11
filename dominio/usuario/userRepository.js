const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);

class UserRepository {
  async createUser(user) {
    return UserModel.create(user);
  }

  async findByUsername(username) {
    return UserModel.findOne({ username });
  }

  async findByEmail(email) {
    return UserModel.findOne(email);
  }

  async findById(id) {
    return UserModel.findById(id).exec();
  }

  async updateUser(id, updates) {
    return UserModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteUser(id) {
    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;

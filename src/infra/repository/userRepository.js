const { generateCode } = require('../../utils/generateCode');
const UserSchema = require('../schema/user');

class UserRepository {
  constructor() {
    this.userRepository = UserSchema;
  }

  async create({
    name,
    secondName,
    email,
    telephone,
    genre,
    birthDate,
    password,
    confirmPassword,
  }) {
    const user = await this.userRepository.create({
      code: generateCode('USER'),
      name,
      secondName,
      email,
      telephone,
      genre,
      birthDate,
      password,
      confirmPassword,
    });
    return user;
  }

  async getOneByEmailAndPassword({ email, password }) {
    const filter = { email, password };
    const user = await this.userRepository.findOne(filter);
    return user;
  }

  async getAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async deleteByCode({ code }) {
    const filter = { code };
    const user = await this.userRepository.deleteOne(filter);
    return user;
  }

  async findByEmail(email) {
    const filter = {
      email: email,
    };
    const user = await this.userRepository.findOne(filter).lean();
    return user;
  }

  async updateByCode({ code, body }) {
    const filter = { code: code };
    const user = await this.userRepository.findOneAndUpdate(filter, body);
    return user;
  }
}

module.exports = UserRepository;
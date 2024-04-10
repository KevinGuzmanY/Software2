
const UserRepository = require('../usuario/userRepository');
const userRepository = new UserRepository();
const jwt = require('jsonwebtoken');

const User = require('../usuario/user');

async function register(userData) {
    const existingUser = await userRepository.findByEmail({ email: userData.email });
    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
    }

    const user = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        bio: userData.bio,
        avatar: userData.avatar
    });

    await user.save();
    return user;
}

async function login(credentials) {
    const user = await userRepository.findByEmail(credentials.email);
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    if (credentials.password != user.password) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    return token;
}

module.exports = { register, login };

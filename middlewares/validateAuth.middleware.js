const { body } = require('express-validator');
const { Admin } = require('../classes/Admin');

const validateAuthMiddleware = [
  body().notEmpty().withMessage('Body must be not empty'),
  body('login').notEmpty().withMessage('Login is require'),
  body('password').notEmpty().withMessage('Password is require'),
  body().custom(async ({ login, password }, { req }) => {
    const admin = new Admin(login);
    await admin.validateAuth(password);
    req.adminLogin = admin.getLogin;
  }),
];

module.exports = validateAuthMiddleware;

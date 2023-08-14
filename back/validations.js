const { body } = require('express-validator');

const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
];

const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
    body('fullName').isLength({ min: 3}),
    body('userRole').isIn(['university', 'company']),
];

module.exports = { loginValidation, registerValidation};
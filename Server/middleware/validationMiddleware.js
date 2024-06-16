import {body, validationResult } from 'express-validator';

const validateUserData = [
    body('name').isLength({ max: 45 }).withMessage('Name must be at most 45 characters'),
    body('username').isLength({ max: 64 }).withMessage('Username must be at most 64 characters'),
    body('email').isEmail().withMessage('Invalid email'),
];




function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


export { validateUserData, validate };
const {check, validationResult} = require('express-validator');

exports.validateMovie = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name can not be empty!')
        .bail()
        .isLength({min: 1})
        .withMessage('Minimum 1 characters required!')
        .bail(),
    check('description')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Description can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('duration')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Duration can not be empty!')
        .bail()
        .isFloat({ min: 0, max: 400 })
        .withMessage('Duration must be a number between 0 and 400 minutes!')
        .bail(),
    check('rating')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Rating can not be empty!')
        .bail()
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating must be a number between 0 and 5 !')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
const {check, validationResult} = require('express-validator');

exports.validateGenre = [
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
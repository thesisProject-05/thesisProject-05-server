const {check} =require('express-validator')
exports.registerValidation = [
    check('fullName', 'FullName is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('password', 'minimum 8 charachters are required for a strong password').isLength({min:8}).matches(/^[A-Za-z0-9 .,'!&]+$/),
    check('dateofBirth', 'Date of Birth is required').not().isEmpty(),
    check('phoneNumber', 'phoneNumber is required').not().isEmpty(),
    check('city', 'please add your city').not().isEmpty(),

]


exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 8 or more characters').isLength({ min: 6 })

]
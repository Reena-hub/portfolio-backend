const { body } = require("express-validator")

function AdminValidation() {
    this.signin = () => {
        return [
            body('username')
                .exists().withMessage("Username is required").bail()
                .notEmpty().withMessage("Username can't be empty").bail()
                .isString().withMessage("Username must be a string").bail()
                .toLowerCase().isEmail().withMessage("Username is invalid").bail(),
            body('password')
                .exists().withMessage("Password is required").bail()
                .notEmpty().withMessage("Password can't be empty").bail()
                .isString().withMessage("Password must be a string").bail()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).withMessage('Password must be mixed character and number')
        ]
    }
}

module.exports = new AdminValidation()
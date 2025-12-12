const { body } = require("express-validator")

function UserValidation() {
    this.create = () => {
        return [
            body('name')
                .exists().withMessage("Name is required").bail()
                .notEmpty().withMessage("Name can't be empty").bail()
                .isString().withMessage("Name must be a string").bail().toLowerCase(),
            body('phone')
                .exists().withMessage("Phone number is required").bail()
                .notEmpty().withMessage("Phone number can't be empty").bail()
                .isString().withMessage("Phone number must be a string").bail()
                .isLength({ min: 10, max: 10 }).withMessage("Phone number should be of 10 numbers")
                .matches(/^[6-9]{1}[0-9]{9}$/).withMessage("Invalid Phone Number"),
            body('email')
                .exists().withMessage("email is required").bail()
                .notEmpty().withMessage("email can't be empty").bail()
                .isString().withMessage("email must be a string").bail()
                .toLowerCase().isEmail().withMessage("email is invalid").bail(),
            body('password')
                .exists().withMessage("Password is required").bail()
                .notEmpty().withMessage("Password can't be empty").bail()
                .isString().withMessage("Password must be a string").bail()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).withMessage('Password must be mixed character and number'),
            body('place')
                .exists().withMessage("place is required").bail()
                .notEmpty().withMessage("place can't be empty").bail()
                .isString().withMessage("place must be a string").bail().toLowerCase(),
            body('title')
                .exists().withMessage("title is required").bail()
                .notEmpty().withMessage("title can't be empty").bail()
                .isString().withMessage("title must be a string").bail(),
            body('description')
                .exists().withMessage("description is required").bail()
                .notEmpty().withMessage("description can't be empty").bail()
                .isString().withMessage("description must be a string").bail(),
            body('shortDescription')
                .exists().withMessage("shortDescription is required").bail()
                .notEmpty().withMessage("shortDescription can't be empty").bail()
                .isString().withMessage("shortDescription must be a string").bail(),
            body('socialMedia')
                .exists().withMessage("Social media details is required").bail()
                .isArray({ min: 1 }).withMessage("Social media details is required").bail(),
            body('socialMedia.*.url')
                .exists().withMessage("Social media url details is required").bail()
                .notEmpty().withMessage("Social media url details can't be empty").bail()
                .isString().withMessage("Social media url details must be a string").bail(),
            body('socialMedia.*.image')
                .exists().withMessage("Social media url details is required").bail()
                .notEmpty().withMessage("Social media url details can't be empty").bail()
                .isString().withMessage("Social media url details must be a string").bail(),
        ]
    }
    this.update = () => {
        return [
            body('name')
                .exists().withMessage("Name is required").bail()
                .notEmpty().withMessage("Name can't be empty").bail()
                .isString().withMessage("Name must be a string").bail().toLowerCase(),
            body('phone')
                .exists().withMessage("Phone number is required").bail()
                .notEmpty().withMessage("Phone number can't be empty").bail()
                .isString().withMessage("Phone number must be a string").bail()
                .isLength({ min: 10, max: 10 }).withMessage("Phone number should be of 10 numbers")
                .matches(/^[6-9]{1}[0-9]{9}$/).withMessage("Invalid Phone Number"),
            body('email')
                .exists().withMessage("email is required").bail()
                .notEmpty().withMessage("email can't be empty").bail()
                .isString().withMessage("email must be a string").bail()
                .toLowerCase().isEmail().withMessage("email is invalid").bail(),
            body('place')
                .exists().withMessage("place is required").bail()
                .notEmpty().withMessage("place can't be empty").bail()
                .isString().withMessage("place must be a string").bail().toLowerCase(),
            body('title')
                .exists().withMessage("title is required").bail()
                .notEmpty().withMessage("title can't be empty").bail()
                .isString().withMessage("title must be a string").bail(),
            body('description')
                .exists().withMessage("description is required").bail()
                .notEmpty().withMessage("description can't be empty").bail()
                .isString().withMessage("description must be a string").bail(),
            body('shortDescription')
                .exists().withMessage("shortDescription is required").bail()
                .notEmpty().withMessage("shortDescription can't be empty").bail()
                .isString().withMessage("shortDescription must be a string").bail(),
            body('socialMedia')
                .exists().withMessage("Social media details is required").bail()
                .isArray({ min: 1 }).withMessage("Social media details is required").bail(),
            body('socialMedia.*.url')
                .exists().withMessage("Social media url details is required").bail()
                .notEmpty().withMessage("Social media url details can't be empty").bail()
                .isString().withMessage("Social media url details must be a string").bail(),
            body('socialMedia.*.image')
                .exists().withMessage("Social media url details is required").bail()
                .notEmpty().withMessage("Social media url details can't be empty").bail()
                .isString().withMessage("Social media url details must be a string").bail(),
        ]
    }
}

module.exports = new UserValidation()
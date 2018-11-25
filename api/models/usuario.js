module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        email: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true,
            unique: true,
            validate: Validator.validate.isEmail
        },
        username: {
            type: 'String',
            trim: true,
            minlength: 4,
            maxlength: 24,
            required: true,
            unique: true,
            validate: Validator.validate.isUsername
        },
        password: {
            type: 'String',
            trim: true,
            minlength: 8,
            maxlength: 16,
            required: true,
            validate: Validator.validate.isPassword
        }
    });

    return mongoose.model('Usuario', schema);
}
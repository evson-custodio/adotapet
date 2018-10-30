module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        email: {
            type: String,
            trim: true,
            maxlength: 64,
            required: true,
            validate: Validator.validate.isEmail,
            unique: true
        },
        username: {
            type: String,
            trim: true,
            minlength: 4,
            maxlength: 24,
            required: true,
            validate: Validator.validate.isUsername,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            minlength: 8,
            maxlength: 16,
            required: true,
            validate: Validator.validate.isPassword,
            unique: false
        }
    });

    return mongoose.model('Usuario', schema);
}
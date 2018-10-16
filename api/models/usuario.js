const uniqueValidator = require('mongoose-unique-validator');
const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    // const Mongoose = api.mongoose.Mongoose;
    // const Schema = api.mongoose.Mongoose.Schema;
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
        email: {
            type: String,
            trim: true,
            maxlength: 64,
            required: true,
            validate: validator.validate.isEmail,
            unique: true
        },
        username: {
            type: String,
            trim: true,
            minlength: 4,
            maxlength: 24,
            required: true,
            validate: validator.validate.isUsername,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            minlength: 8,
            maxlength: 16,
            required: true,
            validate: validator.validate.isPassword
        }
    });

    schema.plugin(uniqueValidator);
    schema.plugin(messageValidator);

    return Mongoose.model('Usuario', schema);
}
const mongoose = require('mongoose');

module.exports = () => {
    const FileSchema = mongoose.Schema({}, {strict: false});
    
    return mongoose.model('File', FileSchema, 'fs.files');
}
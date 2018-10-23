const debug = require('debug')('adotapet:api:controllers:file');

module.exports = (api) => {
    // const FileSchema = require('mongoose').model('File');
    const FileModel = api.models.file;
    const ObjectId = api.mongoose.Mongoose.Types.ObjectId;
    const gfs = api.mongoose.gfs;

    return {
        _id: (req, res, next, _id) => {
            req._id = new ObjectId(_id);
            next();
        },
        create: (req, res) => {
            let ws = gfs.createWriteStream({
                filename: req.headers.filename
            });
            req.pipe(ws);
            ws.on('close', file => {
                debug('File created ' + file.filename + '!');
                res.status(201).json(file);
            });
        },
        read: (req, res) => {
            gfs.createReadStream({_id: req._id}).pipe(res)
            .on('finish', () => {
                debug('File sent by id!');
            });
        },
        delete: (req, res) => {
            gfs.remove({_id: req._id}, err => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    debug('File ' + file.filename + ' deleted by id!');
                    res.status(200).send('OK!');
                }
            });
        },
        list: (req, res) => {
            FileModel.find(req.query)
            .exec()
            .then(files => {
                debug('Files: ');
                debug(files);
                res.status(200).json(files);
            })
            .catch(error => {
                res.status(400).json(error);
            });
        }
    }
}
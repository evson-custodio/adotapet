const debug = require('debug')('adotapet:api:controllers:file');

module.exports = (api) => {
    const gfs = api.mongoose.gfs;
    const FileSchema = api.models.file;

    return {
        _id: (req, res, next, _id) => {
            req._id = _id;
            next();
        },
        create: (req, res) => {
            let ws = gfs.createWriteStream({
                filename: req.headers.filename
            });
            req.pipe(ws);
            ws.on('close', file => {
                debug('File ' + file.filename + ' created!');
                res.status(201).json(file);
            });
        },
        read: (req, res) => {
            FileSchema.findOne({_id: req._id})
            .exec()
            .then(file => {
                // gfs.exist({_id: req._id})
                gfs.createReadStream({_id: req._id}).pipe(res)
                .on('finish', () => {
                    debug('File ' + file._id + ' sent by id!');
                });
            })
            .catch(error => {
                res.status(404).json(error);
            });
        },
        delete: (req, res) => {
            FileSchema.findOne({_id: req._id})
            .exec()
            .then(file => {
                gfs.remove({_id: req._id}, error => {
                    if (error) {
                        res.status(400).json(error);
                    }
                    else {
                        debug('File ' + file._id + ' deleted by id!');
                        res.status(200).json(file);
                    }
                });
            })
            .catch(error => {
                res.status(404).json(error);
            });
        },
        list: (req, res) => {
            FileSchema.find(req.query)
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
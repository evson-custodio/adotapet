module.exports = (api) => {
    const ObjectId = api.mongoose.Mongoose.Types.ObjectId;
    const gfs = api.mongoose.gfs;

    return {
        handlerId: (req, res, next, id) => {
            req.id = new ObjectId(id);
            next();
        },
        handlerName: (req, res, next, name) => {
            req.name = name;
            next();
        },
        getById: (req, res) => {
            console.log('getById!');
            gfs.createReadStream({_id: req.id}).pipe(res)
            .on('finish', () => {
                console.log('Arquivo Enviado!');
            });
        },
        getByName: (req, res) => {
            console.log('getByName!');
            gfs.createReadStream({filename: req.name}).pipe(res)
            .on('finish', () => {
                console.log('Arquivo Enviado!');
            });
        },
        create: (req, res) => {
            console.log('create!');
            let ws = gfs.createWriteStream({
                filename: req.headers.filename
            });
            req.pipe(ws);
            ws.on('close', file => {
                res.status(201).json(file);
            });
        },
        deleteById: (req, res) => {
            console.log('deleteById!');
            gfs.remove({_id: req.id}, err => {
                if (err) {
                    res.json(err);
                }
                else {
                    res.send('OK!');
                }
            });
        },
        deleteByName: (req, res) => {
            console.log('deleteByName!');
            gfs.remove({filename: req.name}, err => {
                if (err) {
                    res.json(err);
                }
                else {
                    res.send('OK!');
                }
            });
        }
    }
}
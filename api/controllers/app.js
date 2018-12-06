const path = require('path');

module.exports = (api) => {
    return {
        qrcode: (req, res, next) => {
            res.sendFile(path.resolve(__dirname, './../../download/qrcode.png'));
        },
        download: (req, res, next) => {
            res.download(path.resolve(__dirname, './../../download/adotapet_mobile.apk'));
        }
    }
}
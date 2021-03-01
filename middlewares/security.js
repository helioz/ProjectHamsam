const StandardError = require('../lib/standardError');


module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        // console.log(req.headers.authorization)
        next()
        return;
    }
    res.status(400).send(StandardError(400, 'NO_AUTH', 'Expected Auth in header. Retry with proper auth', { allowed: true }, 'hamsam.auth.NO_AUTH'));
}
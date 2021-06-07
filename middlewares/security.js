const StandardError = require('../lib/standardError');
const logger = require('../lib/standardLogging');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        // console.log(req.headers.authorization)
        req.userid = "603e6e69aa62fcc5e3c2fd0d"
        next()
        return;
    }
    logger.error('','securityMiddleware', 'NO_AUTH')
    res.status(400).send(StandardError(400, 'NO_AUTH', 'Expected Auth in header. Retry with proper auth', { allowed: true }, 'hamsam.auth.NO_AUTH'));
    return;
}
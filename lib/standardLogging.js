const log = (funcName, moduleName, type, ...message) => {
    const time = new Date().toUTCString();
    console.log(
        `${type} >>> ${time} >>> ${funcName}:${moduleName}\n${type} ==> `, ...message
    )
}

module.exports = {
    error: (funcName, moduleName, ...err) => {
        log(funcName, moduleName, 'ERROR', ...err);
    },
    warn: (funcName, moduleName, ...message) => {
        log(funcName, moduleName, 'WARN', ...message)
    },
    info: (funcName, moduleName, ...inf) => {
        log(funcName, moduleName, 'INFO', ...inf)
    },
    debug: (funcName, moduleName, ...message) => {
        log(funcName, moduleName, 'DEBUG', ...message)
    }
}
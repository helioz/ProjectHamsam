const log = (funcName, moduleName, type, ...message) => {
    const time = new Date().getTime() / 1000;
    console.log(
        `${time} :: ${funcName}:${moduleName} => ${type} : `, ...message
    )
}

module.exports = {
    error: (funcName, moduleName, ...err) => {
        log(funcName, moduleName, 'ERROR', ...err);
    },
    info: (funcName, moduleName, ...inf) => {
        log(funcName, moduleName, 'INFO', ...inf)
    },
    debug: (funcName, moduleName, ...message) => {
        log(funcName, moduleName, 'DEBUG', ...message)
    }
}
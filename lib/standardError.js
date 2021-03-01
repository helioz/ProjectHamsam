module.exports = (code, status, message, retryInfo, type) => {
    return {
        error: true,
        code,
        status,
        message,
        retryInfo,
        details: [
            {
                type,
                reason: status,
                domain: 'hamsam.com', //Fetch from env
                metadata: {
                    service: 'hamsam-main'
                }
            }
        ]
    }
}
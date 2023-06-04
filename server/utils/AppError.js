class AppError extends Error{
    constructor(statusCode,message){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status= `${this.status}`.startsWith("4") ? "faild" : "error"
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = AppError
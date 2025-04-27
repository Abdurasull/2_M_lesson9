class ClientError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
        this.message = `ClientError: ${message} !`;
    }
}
class ServerError extends Error{
    constructor(message){
        super(message);
        this.status = 500;
    }
}

const globalError = (err, res) => {
    let error ={
        message: err.message,
        status: err.status || 500
    }
    return res.status(error.status).json(error);
}

export {globalError, ClientError, ServerError};
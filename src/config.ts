import * as dotenv from "dotenv";

/**
 * @see https://www.npmjs.com/package/dotenv#config
 */
dotenv.config();

/*
| -----------------------------
| Server Configuration
| -----------------------------
| The config is related to that server 
| which router wants to send socket data
| to that.
| 
*/
export const server = {
    full: process.env.SERVER_PROTOCOL + '://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    protocol: process.env.SERVER_PROTOCOL,
};

/*
| -----------------------------
| Client Configuration
| -----------------------------
| The config is related to that server 
| which router wants to get socket data 
| from that.
| 
*/
export const client = {
    port: process.env.CLIENT_PORT,
    queue: process.env.CLIENT_QUEUE,
    secure: process.env.CLIENT_SECURE,
};

/*
| -----------------------------
| Ssl Configuration
| -----------------------------
| The config is related to this if server 
| is secure, you should set the ssl configs,
| in other words if set secure your protocol for
| connecting to client and get the data is https
| otherwise is http.
| 
*/
export const ssl = {
    ca: process.env.SSL_CA,
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
};

/*
| -----------------------------
| Settings Configuration
| -----------------------------
| This config is related to router settings
| for easly development. 
| 
*/
export const settings = {
    dev_mode: process.env.DEV_MODE,
    log_status: process.env.LOG_STATUS,
    queue_enabled: process.env.QUEUE_ENABLED,
};


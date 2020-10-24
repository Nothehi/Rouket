import fs from 'fs';
import app from 'express';
import io from 'socket.io';
import { client, ssl, settings } from '../../config';
import { Logger } from '../Core/Core';

/**
 * Client server
 * ------------------------------------------
 * this class try to connect to client or 
 * otherwise connecting to the ui.
 */
class Client {
    client_server: any;

    client_io: io;

    constructor() {
        if (client.secure) {
            this.client_server = require('https').createServer(this.ssl(), app);
        } else {
            this.client_server = require('http').createServer(app);
        }

        this.client_io = io(this.client_server);
    }

    listen(port?: number) {
        let client_port = port ?? client.port;

        this.client_server.listen(client_port, function () {
            console.clear();
            Logger.message('listen on port ' + client_port);
        });
    }

    private ssl(): Object {
        return {
            key: fs.readFileSync(ssl.key),
            cert: fs.readFileSync(ssl.cert),
            ca: fs.readFileSync(ssl.ca),
            requestCert: false,
            rejectUnauthorized: false
        };
    }
}

export { Client as ClientConnector };
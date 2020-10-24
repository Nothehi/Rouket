import Echo from 'laravel-echo';
import io from 'socket.io-client';
import { server } from '../../config';
import { Logger, Client } from '../Core/Core';

// declare global variable io for use laravel echo
const globalAny: any = global;
globalAny.io = io;

/**
 * Server class
 * ------------------------------------------
 * this class try to connect main server to
 * or otherwise connecting to the core. 
 */
class Server {

    config: Object;

    client: Client;

    private server_conn: Echo;

    constructor(client?: Client) {
        this.client = client;

        if (client !== null) {
            this.setConfigSecure(client.getToken());
        } else {
            this.setConfigNormal();
        }
    }

    public getEchoConnection(): Echo {
        return this.server_conn;
    }

    public connect() {
        this.server_conn = new Echo(this.config);


        this.server_conn.connector.socket.on('connect', () => {
            Logger.message(this.client.getId() + ' has been connected to the server side of the router!');
        });

        this.server_conn.connector.socket.on('disconnect', () => {
            Logger.message(this.client.getId() + ' has been disconnected from the server side of the router!');
        });

        this.server_conn.connector.socket.on('reconnecting', (attempt) => {
            Logger.message('try reconnecting to ' + this.client.getId() + ' the server for ' + attempt + 'st time');
        });
    }

    private setConfigSecure(token: Object) {
        this.config = {
            broadcaster: 'socket.io',
            host: server.full,
            transport: ['websocket'],
            encrypted: true,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        }
    }

    private setConfigNormal() {
        this.config = {
            broadcaster: 'socket.io',
            host: server.full,
            transport: ['websocket'],
            encrypted: true,
        }
    }
}

export { Server as ServerConnector };
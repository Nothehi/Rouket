import * as Core from './Core';

export class ClientCollection {

    public _: any;

    public clients: any[] = new Array();


    constructor() {
        this._ = require('underscore');
    }

    public addClient(client: Core.Client) {
        this.clients.push({
            id: client.getId(),
            socket: client.getSocket(),
            ip: client.getIp(),
            token: client.getToken(),
            server_connection: client.getServerConnection(),
            joined_at: client.getJoinedAt(),
        });

        return this;
    }

    public removeClient(client: Core.Client) {
        this.clients = this._.without(this.clients, this._.findWhere(this.clients, {
            id: client.getId(),
            ip: client.getIp()
        }));

        return this;
    }

    public findClientWithID(id: String) {
        return this._.findWhere(this.clients, {
            id
        });
    }

    public findClientWithIP(ip: String) {
        return this._.findWhere(this.clients, {
            ip
        });
    }

    public getClientsCount(): Number {
        return this.clients.length;
    }

    public hasClient(): Boolean {
        return this.getClientsCount() >= 1;
    }

    public printTable() {
        let Table = require('cli-table');
        let table = new Table({
            head: ['#', 'Socket', 'IP', 'Token', 'Server Connection', 'Joined At']
        });

        table.push(this.flattenDeep(this.toArray()));

        console.log(table.toString());
    }

    public toArray(): any[] {
        return this.clients.map(Object.values);
    }

    private flattenDeep(arr1) {
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val), []);
    }
}
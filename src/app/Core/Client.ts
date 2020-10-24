import Echo from 'laravel-echo';

export class Client {

    protected id: String;

    protected socket: any;

    protected ip: String;

    protected user: any;

    protected token: String;

    protected server_connection: Echo;

    protected joined_at: Date;


    public setId() {
        this.id = this.makeID(5);

        return this;
    }

    public getId() {
        return this.id;
    }

    public setSocket(socket: any) {
        this.socket = socket;

        return this;
    }

    public getSocket() {
        return this.socket;
    }

    public setIp(ip: String) {
        this.ip = ip;

        return this;
    }

    public getIp() {
        return this.ip;
    }

    public setUser(user: String) {
        this.user = user;

        return this;
    }

    public getUser() {
        return this.user;
    }

    public setToken(token: string) {
        this.token = token;

        return this;
    }

    public getToken() {
        return this.token;
    }

    public setServerConnection(server_connection: Echo) {
        this.server_connection = server_connection;

        return this;
    }

    public getServerConnection(): Echo {
        return this.server_connection;
    }

    public setJoinedAt(joined_at: Date) {
        this.joined_at = joined_at;

        return this;
    }

    public getJoinedAt() {
        return this.joined_at;
    }

    private makeID(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}

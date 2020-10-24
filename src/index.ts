import * as Connections from './app/Connections/Connections';
import * as Core from './app/Core/Core';

const client_conn = new Connections.ClientConnector();

client_conn.listen();

// client collection
let collection = new Core.ClientCollection();

client_conn.client_io.on('connection', (socket) => {
    // create client
    let client = new Core.Client()
        .setId()
        .setSocket(socket)
        .setIp(socket.handshake.address.replace('::ffff:', ''))
        .setJoinedAt(new Date);

    let server_conn: Connections.ServerConnector;

    // --> connection event
    socket.on('set_connection', (data) => {
        client.setToken(data.token);
        client.setUser(data.user);
        Core.Logger.message(client.getId() + ' has been connected to the client side of the router!');

        // connection to server
        server_conn = new Connections.ServerConnector(client);
        server_conn.connect();
        client.setServerConnection(server_conn.getEchoConnection());

        collection.addClient(client);

        // routing
        if (collection.hasClient()) {
            Core.Router.public('example.channel', '.example_event', client, false);
        }
    });

    // --> disconnection event
    socket.on('disconnect', () => {
        // remove client
        Core.Logger.message(client.getId() + ' has been disconnected to the client side of the router!');
        client.getServerConnection().disconnect();
        collection.removeClient(client);
    });
});
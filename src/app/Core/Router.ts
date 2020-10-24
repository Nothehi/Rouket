import { Logger, Client } from '../Core/Core';

export class Router {

    public static public(channel, event, client: Client, log: Boolean = true) {
        client.getServerConnection().channel(channel).listen(event, (e) => {
            if (log) {
                Logger.message(`channel ${channel} called!`);
            }

            client.getSocket().emit(channel, e);
        });
    }

    public static private(channel, event, client: Client, log: Boolean = true) {
        client.getServerConnection().private(channel + '.' + client.getUser()).listen(event, (e) => {
            if (log) {
                Logger.message(`channel ${channel} called!`);
            }

            client.getSocket().emit(channel + '.' + client.getUser(), e);
        });
    }
}
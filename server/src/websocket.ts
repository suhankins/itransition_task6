import { AddressInfo, WebSocketServer } from 'ws';
import { Action } from './actions/Action.js';
import {
    NO_ACTION,
    UNKNOWN_ACTION,
} from './Responses.js';
import { User } from './User.js';

export let wss: WebSocketServer;

export function startWsServer() {
    wss = new WebSocketServer({ port: 8080 });
    let address: string | AddressInfo = wss.address();
    if (typeof address !== 'string') {
        address = address.port.toString();
    }
    console.log(`Websocket server listening on port ${address}`);

    wss.on('connection', (ws) => {
        const user: User = {
            name: undefined
        };

        ws.on('error', console.error);

        ws.on('message', (rawReq: Buffer) => {
            const req = JSON.parse(rawReq.toString());
            const action = req.action;

            console.log(`${new Date(Date.now()).getSeconds()} USER ${user.name} REQUESTED ${action}(${JSON.stringify(req.data)})`);

            if (action === undefined) {
                ws.send(NO_ACTION);
                return;
            }
            if (Action.Actions[action] === undefined) {
                ws.send(UNKNOWN_ACTION);
                return;
            }

            Action.Actions[action].call(user, ws, req.data);
        });
    });
}

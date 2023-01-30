import { AddressInfo, WebSocketServer } from 'ws';
import { Action } from './actions/Action.js';
import {
    NO_ACTION,
    UNKNOWN_ACTION,
} from './Responses.js';
import { User } from './User.js';

export let wss: WebSocketServer;

export function startWsServer(server: any) {
    wss = new WebSocketServer({ server: server });
    console.log(`Websocket server listening`);

    wss.on('connection', (ws) => {
        const user: User = {
            name: undefined
        };

        ws.on('error', console.error);

        ws.on('message', (rawReq: Buffer) => {
            const req = JSON.parse(rawReq.toString());
            const action = req.action;

            console.log(`USER ${user.name} REQUESTED ${action}(${JSON.stringify(req.data)})`);

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

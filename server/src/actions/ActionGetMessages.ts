import { WebSocket } from 'ws';
import { getMessages } from '../db/messagesDb.js';
import { UNAUTHORIZED } from '../Responses.js';
import { User } from '../User.js';
import { Action } from './Action.js';

export class ActionGetMessages extends Action {
    public async call(user: User, ws: WebSocket, params: any): Promise<void> {
        if (user.name === undefined) {
            ws.send(UNAUTHORIZED);
            return;
        }
        await getMessages(user.name).then((rows) => {
            ws.send(
                JSON.stringify({
                    result: 'messageList',
                    data: rows,
                })
            );
        });
    }
}

import { WebSocket } from 'ws';
import { getMessages, getNewMessages } from '../db/messagesDb.js';
import { Message } from '../Message.js';
import {
    NAME_ALREADY_DEFINED,
    STRING_TOO_LONG,
    STRING_TOO_SHORT,
    SUCCESS,
} from '../Responses.js';
import { User } from '../User.js';
import { Action } from './Action.js';

export class ActionSetName extends Action {
    public async call(user: User, ws: WebSocket, params: string): Promise<void> {
        if (user.name === undefined) {
            const data = params;
            if (data.length > 22) {
                ws.send(STRING_TOO_LONG('Name'));
                return;
            } else if (data.length === 0) {
                ws.send(STRING_TOO_SHORT('Name'));
                return;
            }
            user.name = data.trim();
            const result = { ...SUCCESS };
            await getMessages(user.name).then((rows) => {
                result.data = rows;
                ws.send(JSON.stringify(result));
            });
            
        } else {
            ws.send(NAME_ALREADY_DEFINED);
        }
    }
}

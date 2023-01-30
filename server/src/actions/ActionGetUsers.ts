import { WebSocket } from 'ws';
import { getUsers } from '../db/messagesDb.js';
import { User } from '../User.js';
import { Action } from './Action.js';

export class ActionGetUsers extends Action {
    public async call(user: User, ws: WebSocket, params: any): Promise<void> {
        const data = await getUsers();
        ws.send(
            JSON.stringify({
                result: 'userList',
                data: data,
            })
        );
    }
}

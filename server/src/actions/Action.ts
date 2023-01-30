import { WebSocket } from 'ws';
import { User } from '../User.js';

export abstract class Action {
    public static Actions: { [id: string]: Action } = {};

    constructor(name: string) {
        Action.Actions[name] = this;
    }

    public static Init() {
        import('./ActionSetName.js').then((result) => {
            new result.ActionSetName('setName');
        });
        import('./ActionGetUsers.js').then((result) => {
            new result.ActionGetUsers('getUsers');
        });
        import('./ActionSendMessage.js').then((result) => {
            new result.ActionSendMessage('sendMessage');
        });
        import('./ActionGetMessages.js').then((result) => {
            new result.ActionGetMessages('getMessages');
        });
    }

    public abstract call(
        user: User,
        ws: WebSocket,
        params: any
    ): void | Promise<void>;
}

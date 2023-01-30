import { WebSocket } from 'ws';
import { writeMessage } from '../db/messagesDb.js';
import { Message } from '../Message.js';
import {
    STRING_TOO_LONG,
    STRING_TOO_SHORT,
    UNAUTHORIZED,
} from '../Responses.js';
import { User } from '../User.js';
import { Action } from './Action.js';

export class ActionSendMessage extends Action {
    public async call(
        user: User,
        ws: WebSocket,
        params: Message
    ): Promise<void> {
        if (user.name === undefined) {
            ws.send(UNAUTHORIZED);
            return;
        }
        const title = params.title.trim();
        const content = params.content.trim();
        const recipient = params.recipient.trim();

        if (recipient.length > 22) {
            ws.send(STRING_TOO_LONG('Recipient name'));
            return;
        }
        if (recipient.length === 0) {
            ws.send(STRING_TOO_SHORT('Recipient name'));
            return;
        }
        if (title.length > 100) {
            ws.send(STRING_TOO_LONG('Title'));
            return;
        }
        if (title.length === 0) {
            ws.send(STRING_TOO_SHORT('Title'));
            return;
        }
        if (content.length > 2000) {
            ws.send(STRING_TOO_LONG('Content'));
            return;
        }
        if (content.length === 0) {
            ws.send(STRING_TOO_SHORT('Content'));
            return;
        }

        await writeMessage(title, content, user.name, recipient);
        console.log(`${user.name} sent message to ${recipient}`);
        ws.send(
            JSON.stringify({
                result: 'messageSent',
            })
        );
    }
}

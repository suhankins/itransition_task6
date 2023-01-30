import { client } from './indexDb.js';

export async function getMessages(username: string) {
    const result = await client.query(
        'SELECT * FROM messages WHERE sender=$1 OR recipient=$1;',
        [username]
    );
    return result.rows;
}

export async function getUsers() {
    let result = await client.query(
        `SELECT sender
            FROM messages
        UNION
        SELECT recipient
            FROM messages;`
    );
    let users: string[] = [];
    result.rows.forEach((row) => {
        if (!users.includes(row.sender)) {
            users.push(row.sender);
        }
    });
    return users;
}

export async function getNewMessages(username: string, date: number) {
    const result = await client.query(
        'SELECT * FROM messages WHERE (sender=$1 OR recipient=$1) AND date>$2',
        [username, date]
    );
    return result.rows;
}

export async function writeMessage(
    title: string,
    content: string,
    sender: string,
    recipient: string
) {
    const result = await client.query(
        'INSERT INTO messages(sender,recipient,title,content,date) VALUES ($1,$2,$3,$4,$5);',
        [sender, recipient, title, content, Date.now()]
    );
    return result;
}

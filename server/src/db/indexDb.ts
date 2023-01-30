import Client from 'pg';

export let client: Client.Client;
export function connectClient() {
    client = new Client.Client({
        connectionString: process.env.CONNECTION_STRING,
    });
    client.connect().then(() => {
        client.query(
            `CREATE TABLE IF NOT EXISTS messages
                (id SERIAL PRIMARY KEY UNIQUE,
                sender TEXT NOT NULL,
                recipient TEXT NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                date bigint);`
        );
    });
}

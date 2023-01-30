import { httpServer } from './httpServer.js';
import { createServer } from 'http';
import { connectClient } from './db/indexDb.js';

/**
 * Loading .env
 */
import * as dotenv from 'dotenv';
import { startWsServer, wss } from './websocket.js';
import { Action } from './actions/Action.js';
dotenv.config();

/**
 * Connecting to DB
 */
connectClient();

/**
 * Starting websocket server
 */
Action.Init();

/**
 * Store port in Express.
 */
httpServer.set('port', process.env.PORT || 9000);

/**
 * Create HTTP server.
 */
let server = createServer(httpServer);

startWsServer(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(httpServer.get('port'), () => {
    console.log(`HTTP server listening on port ${httpServer.get('port')}`);
});

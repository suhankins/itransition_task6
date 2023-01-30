import express, { json } from 'express';
import { cors } from './cors.js';

export let httpServer = express();

httpServer.use(json());
httpServer.use(cors);

httpServer.use(express.static('dist'));

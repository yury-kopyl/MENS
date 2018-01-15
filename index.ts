import { App } from './backend/app';
import { Mongoose } from './backend/db/mongodb';
import { CreateServer } from './backend/http';
import { Socket } from './backend/socket';
import * as cfg from './common/config/config.json';

const app = App.bootstrap((cfg as any).serverPort).app;
const server = CreateServer.bootstrap(app, (cfg as any).serverPort).server;
export const io = Socket.bootstrap(server, (cfg as any).wsPort);
export const mongoose = Mongoose.init(
	(cfg as any).mongodbHost + ':' +
	(cfg as any).mongodbPort + '/' +
	(cfg as any).mongodbDatabase
);

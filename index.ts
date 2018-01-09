import { App } from './backend/app';
import { CreateServer } from './backend/http';
import * as cfg from './common/config/config.json';

const app = App.bootstrap((cfg as any).serverPort).app;
const server = CreateServer.bootstrap(app, (cfg as any).serverPort).server;

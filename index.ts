import * as express from 'express';
import { join } from 'path';
import { CreateServer } from './backend/http';
import { IndexRoute } from './backend/routes/index';

const app = express();
let router: express.Router;

console.log(join(__dirname, 'backend', 'views'));

app.set('port', 8080);
app.set('views', join(__dirname, 'backend', 'views'));
app.set('view engine', 'pug');
app.use(express.static(join(__dirname, 'frontend')));

router = express.Router();
// Index
IndexRoute.create(router);

// Use router middleware
app.use(router);

const server = new CreateServer(app, 8080);

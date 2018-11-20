import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import Routes from './src/routes';

const { defaultRouter } = Routes;

const app = new Koa();

app.use(bodyParser());
app.use(logger());
app.use(cors());
app.use(defaultRouter.routes());
app.use(defaultRouter.allowedMethods());
// dev: port 3000, prod: port 80  
app.listen(3000);
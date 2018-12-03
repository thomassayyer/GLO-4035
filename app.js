import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import Routes from './src/routes';

const { defaultRouter, transactionsRouter, creationsRouter, usagesRouter, densitiesRouter } = Routes;

const app = new Koa();

app.use(bodyParser());
app.use(logger());
app.use(cors());
app.use(defaultRouter.routes());
app.use(defaultRouter.allowedMethods());
app.use(transactionsRouter.routes());
app.use(transactionsRouter.allowedMethods());
app.use(creationsRouter.routes());
app.use(creationsRouter.allowedMethods());
app.use(usagesRouter.routes());
app.use(usagesRouter.allowedMethods());
app.use(densitiesRouter.routes());
app.use(densitiesRouter.allowedMethods());
// dev: port 3000, prod: port 80  
app.listen(3000);
import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';

const router = new koaRouter();

router.get('/creations', async ctx => {
  //TODO
});

router.post('/creations', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'create') ctx.body = ''; //TODO
  else ctx.status = 400;
});

router.delete('/creations', async ctx => {
  //TODO
});

export {
  router,
}
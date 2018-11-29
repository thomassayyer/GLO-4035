import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';

const router = new koaRouter();

router.get('/usages', async ctx => {
  //TODO
});

router.post('/usages', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'usage') ctx.body = ''; //TODO
  else ctx.status = 400;
});

router.delete('/usages', async ctx => {
  //TODO
});

export {
  router,
}
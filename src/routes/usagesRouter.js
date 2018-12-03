import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';
import UsageManager from '../Manager/Usage';

const router = new koaRouter();

router.get('/usages', async ctx => {
  ctx.body = await UsageManager.getAll();
});

router.post('/usages', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'usage') ctx.body = await Dispatcher.createUsage(payload);
  else ctx.status = 400;
});

router.delete('/usages', async ctx => {
  const payload = ctx.request.body;
  const result = await UsageManager.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}
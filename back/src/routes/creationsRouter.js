import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';
import CreationManager from '../Manager/Creation';

const router = new koaRouter();

router.get('/creations', async ctx => {
  ctx.body =  await CreationManager.getAll();
});

router.post('/creations', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'create') ctx.body = await Dispatcher.createCreation(payload);
  else ctx.status = 400;
});

router.delete('/creations', async ctx => {
  const payload = ctx.request.body;
  const result = await CreationManager.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}
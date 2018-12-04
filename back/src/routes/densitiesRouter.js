import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';
import DensityManager from '../Manager/Density';

const router = new koaRouter();

router.get('/densities', async ctx => {
  ctx.body = await DensityManager.getAll();
});

router.post('/densities', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'density') ctx.body = await Dispatcher.createDensity(payload);
  else ctx.status = 400;
});

router.delete('/densities', async ctx => {
  const payload = ctx.request.body;
  const result = await DensityManager.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}
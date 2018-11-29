import koaRouter from 'koa-router';
import Dispatcher from '../Dispatcher';

const router = new koaRouter();

router.get('/densities', async ctx => {
  //TODO
});

router.post('/densities', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'density') ctx.body = ''; //TODO
  else ctx.status = 400;
});

router.delete('/densities', async ctx => {
  //TODO
});

export {
  router,
}
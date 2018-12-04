import koaRouter from 'koa-router';
import TransactionManager from '../Manager/Transaction';
import Dispatcher from '../Dispatcher';

const router = new koaRouter();

router.get('/', async ctx => {
  ctx.body = 'Helloworld';
});

router.post('/', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.dispatch(payload);
  if (result === 'Bad Request') ctx.status = 400;
  else ctx.body = result;
});

router.delete('/', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}
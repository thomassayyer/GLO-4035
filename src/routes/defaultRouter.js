import koaRouter from 'koa-router';
import TransactionManager from '../Manager/transaction';

const router = new koaRouter();

router.get('/', ctx => {
  ctx.body = 'HelloWorld';
});

router.get('/transactions', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

router.post('/transactions', async ctx =>{
  const payload = ctx.request.body;
  ctx.body = await TransactionManager.create(payload);
});

router.delete('/transactions', async ctx => {
  const payload = ctx.request.body;
  const result = await TransactionManager.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}
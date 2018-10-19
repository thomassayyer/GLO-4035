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
})

export {
  router,
}
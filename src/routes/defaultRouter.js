import koaRouter from 'koa-router';
import TransactionManager from '../Manager/transaction';

const router = new koaRouter();

router.get('/', ctx => {
  ctx.body = 'HelloWorld';
});

router.get('/transactions', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

export {
  router,
}
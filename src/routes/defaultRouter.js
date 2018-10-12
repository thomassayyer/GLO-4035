import koaRouter from 'koa-router';
import TransactionManager from '../Manager/transaction';

const router = new koaRouter();

router.get('/', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

export {
  router,
}
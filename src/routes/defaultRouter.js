import koaRouter from 'koa-router';
import TransactionManager from '../Manager/transaction';

const router = new koaRouter();

router.get('/', ctx => {
  ctx.body = 'HelloWorld';
});

router.get('/transactions', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

<<<<<<< HEAD
router.delete('/transactions', async ctx => {
  ctx.body = await TransactionManager.remove(ctx.request.body.password);
});
=======
router.post('/transactions', async ctx =>{
  const payload = ctx.request.body;
  ctx.body = await TransactionManager.create(payload);
})
>>>>>>> 1afac325b2384f7a81bae67590b7e508ac3622c9

export {
  router,
}
import koaRouter from 'koa-router';
import TransactionManager from '../Manager/Transaction';
import Dispatcher from '../Dispatcher';
import { format } from 'date-fns';

const router = new koaRouter();

router.get('/transactions', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

router.get('/transactions/total', async ctx => {
  let { date, material } = ctx.query;
  if (typeof material === "string") material = material.split(',');
  date = new Date(date);
  const result = await TransactionManager.getTotalCost(material, date);
  if (result !== null ) ctx.body = { cost: result.cost };
  else ctx.status = 404;
});

router.get('/transactions/stock', async ctx => {
  let { date } = ctx.query;
  date = new Date(date);
  const payload = await TransactionManager.getStock(date);
  const res = [];
  payload.forEach(transaction => {
    res.push({ name: transaction.name, stock: transaction.result, unit: transaction.unit });
  });
  ctx.body = res;
});

router.post('/transactions', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'transaction') ctx.body = await Dispatcher.createTransaction(payload);
  else ctx.status = 400;
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
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const usersRouter = new Router({
    prefix: '/users'
});

const auth = async (ctx, next) => {
    if (ctx.url === '/users') {
        ctx.throw(401)
    }
    await next();
}

usersRouter.get('/', (ctx) => {
    ctx.body = '这是主页';
});

usersRouter.get('/', auth, (ctx) => {
    ctx.body = '这是用户列表';
});

usersRouter.post('/', (ctx) => {
    ctx.body = '这是创建用户';
});

usersRouter.get('/:id', (ctx) => {
    ctx.body = `这是用户${ctx.params.id}`
});


app.use(usersRouter.routes())
app.use(router.routes())
app.listen(3000);

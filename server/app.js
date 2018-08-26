const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./router/user');

app.use(cors());
app.use(bodyParser());
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            };
        } else {
            throw err;
        }
    });
});
app.use(userRouter.routes());

app.listen(3000);
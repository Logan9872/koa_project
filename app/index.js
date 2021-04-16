const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const { app } = require('node:process');
const parameter = require('koa-parameter');
// const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require('./routes');

app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

// mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('MongoDB链接成功！'));
// mongoose.connection.on('error', console.error);

app.use(bodyparser());
app.use(parameter(app));
routing(app);
app.listen(3000, () => console.log('程序已启动！'));

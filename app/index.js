const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require('./routes');

app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

mongoose.connect(connectionStr, () => console.log('MongoDB链接成功！'));
mongoose.connection.on('error', console.error);

app.use(bodyParser());
app.use(parameter(app));
routing(app);
app.listen(3000, () => console.log('程序已启动！'));

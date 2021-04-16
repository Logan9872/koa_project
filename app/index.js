const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const Router = require('koa-router');
const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');

const { connectionStr } = require('./routes')


// mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('MongoDB链接成功！'));
// mongoose.connection.on('error', console.error);

app.use(bodyParser());
routing(app);
app.listen(3000, () => console.log('程序已启动！'));

const Koa = require('koa');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path')
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require('./config');

app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

mongoose.connect(connectionStr, { useUnifiedTopology: true }, () => console.log('MongoDB链接成功！'));
mongoose.connection.on('error', console.error);

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true,
    },
}));
app.use(parameter(app));
routing(app);
app.listen(3000, () => console.log('程序已启动！'));

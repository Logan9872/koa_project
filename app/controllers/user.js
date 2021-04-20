const jwt = require('koa-jwt');
const User = require('../models/user');
const { secret } = require('../config');

class UsersCtl {
    async find(ctx) {
        ctx.body = await User.find();
    }
    async findById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join('');
        const user = await (await User.findById(ctx.params.id)).select(selectFields);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.body = user;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true },

        });
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        if (repeatedUser) {
            ctx.throw(409, '用户冲突');
        }
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }

    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限') }
        await next();
    }

    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            password: { type: 'string', require: false },
            avatar_url: { type: 'string', require: false },
            gender: { type: 'string', require: false },
            headline: { type: 'string', require: false },
            locations: { type: "array", itemType: 'string', require: false },
            business: { type: 'string', require: false },
            employments: { type: 'array', itemType: 'object', require: false },
            educations: { type: 'array', itemType: 'object', require: false },
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) { ctx.throw(404); "用户不存在" }
        ctx.body = user;
    }
    async delete(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) { ctx.throw(404); "用户不存在" }
        ctx.status = 204;
    }
    async login(ctx) {
        ctx, verifyParams({
            name: { type: 'string', require: true },
            password: { type: 'string', require: true }
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) { ctx.throw(401, '用户名或密码不正确'); }
        const { id, name } = user;
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
        ctx.body = { token };
    }

}

module.exports = new UsersCtl();
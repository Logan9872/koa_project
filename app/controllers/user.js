const db = { name: '刘邦' };

class UsersCtl {
    find(ctx) {
        ctx.body = db;
    }
    findById(ctx) {
        if (ctx.params.id * 1 >= db.length) {
            ctx.throw(412, '先决条件失败：id 大于等于数组长度')
        }
        ctx.body = db[ctx.params.id * 1];
    }
    creat(ctx) {
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    delete(ctx) {
        ctx.status = 204;
    }
}

module.exports = UsersCtl();
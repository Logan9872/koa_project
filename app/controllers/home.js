class HomeCtl {
    index() {
        ctx.body = '这是主页';
    }
}

module.exports = new HomeCtl();
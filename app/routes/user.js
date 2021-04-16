const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const { find, findById, create, update, delete: del } = require('../controller/user.js')

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.put('/:id', update);

router.delete(del);

module.exports = router;
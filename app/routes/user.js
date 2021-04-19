const jwt = require('koa-jwt');
const Router = require('koa-router');
const { secret } = require('../config.js');
const router = new Router({ prefix: '/users' });
const {
    find, findById, create, update, delete: del, login, checkOwner,
} = require('../controllers/user.js');

const auth = jwt({ secret });

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.patch('/:id', auth, checkOwner, update);

router.delete('/:id', auth, checkOwner, del);

router.post("/:id", login);

module.exports = router;

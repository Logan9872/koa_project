const jwt = require('koa-jwt');
const Router = require('koa-router');
const { secret } = require('../config.js');
const router = new Router({ prefix: '/user' });
const {
    find, findById, create, update, delete: del, login, checkOwner,
} = require('../controllers/user');

const auth = jwt({ secret });

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.patch('/:id', auth, checkOwner, update);

router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

module.exports = router;

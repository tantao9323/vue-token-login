const Router = require('koa-router');
const router = new Router();
const jwt = require('koa-jwt');
const auth = jwt({
    secret: 'shared-secret'
});
const userController = require('../controller/user');

router.post('/api/login', userController.userLogin);
router.post('/api/getuserinfo', auth, userController.getUserInfo);

module.exports = router;
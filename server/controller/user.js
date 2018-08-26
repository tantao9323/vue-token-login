const jwt = require('jsonwebtoken');

const userLogin = async (ctx, next) => {
    const token = jwt.sign({
        userid: 123,
        username: ctx.request.body.username
    }, 'shared-secret', {
        expiresIn: '60s'
    });
    ctx.status = 200;
    ctx.body = {
        token: token
    };
}

const getUserInfo = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        userInfo: {
            nickname: 'foobar'
        }
    };
}

module.exports = {
    userLogin,
    getUserInfo
}
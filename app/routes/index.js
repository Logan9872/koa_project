const fs = require('fs');
const router = require('./home');

module.exports = (app) => {
    fs.readdirSync(_dirname).forEach(file => {
        if (file === 'index.js') { return; }
        const route = require(`./${file}`);
        app.use(router.routes()).use(route.allowedMethods());
    })
}
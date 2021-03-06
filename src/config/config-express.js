require('marko/node-require').install();
require('marko/express');


const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
const routes = require('../app/routes/routes');

const methodOverride = require('method-override');

app.use('/static',express.static('src/app/public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body ==='object' && '_method'in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;

    };
}));
const sessionAutentication= require('./session-autentication');
sessionAutentication(app);

routes(app);
app.use(function(req, resp, next){
    return resp.status(404).marko(
        require('../app/views/base/errors/error404.marko')
    );
});
app.use(function(erro,req, resp, next){
    return resp.status(500).marko(
        require('../app/views/base/errors/error500.marko')
    );
});



module.exports = app;

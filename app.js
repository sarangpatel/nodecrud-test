
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
const jwt = require('jsonwebtoken');


//load customers route
var customers = require('./routes/customers'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single

);
const accessTokenSecret = 'secretcode';
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                res.status(401);
                res.json({'message':'Unauthorized access.'});                
            }

            req.token = token;
            next();
        });
    } else {
         let token =  req.params.token
         console.log(token);
         if(token){
            token = token.trim();
            jwt.verify(token, accessTokenSecret, (err, token) => {
                if (err) {
                    res.status(401);
                    res.json({'message':'Unauthorized access.'});                
                }
                req.token = token;
                next();
            });
         }else{
             res.status(401);
             res.json({'message':'Unauthorized access.'});
        }
    }
};

//http://localhost:4300/customers/tokenstrin
app.get('/getToken', routes.getToken);
app.get('/', authenticateJWT, routes.index);
app.get('/customers', authenticateJWT, customers.list);
//app.get('/customers/:token', authenticateJWT, customers.list);
app.get('/customers/add', authenticateJWT, customers.add);
app.post('/customers/add', authenticateJWT, customers.save);
app.get('/customers/delete/:id', authenticateJWT,  customers.delete_customer);
app.get('/customers/edit/:id', authenticateJWT, customers.edit);
app.post('/customers/edit/:id', authenticateJWT, customers.save_edit);
//for report ex:
//http://localhost:4300/customers/report?id=13&from_date=2020-12-03&to_date=2020-12-06&fitness_type=calories
app.get('/customers/report',authenticateJWT,customers.report);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

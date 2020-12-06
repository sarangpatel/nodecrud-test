
/*
 * GET home page.
 */

 const jwt = require('jsonwebtoken');


exports.index = function(req, res){
  res.render('index', { title: 'Hello World' });
};


exports.getToken = function(req, res,next){
	const accessTokenSecret = 'secretcode';
	const payload = { nodecrud: 'nodecrud' };
	const options = { expiresIn: '2d', issuer: 'http://localhost' };
	const secret = accessTokenSecret;
	const token = jwt.sign(payload, secret, options);
	res.status(200).send({token:token});
};

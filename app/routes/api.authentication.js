var config = require('../../config');
var User = require('../models/user');

var middleware = require('../middleware/middleware');

module.exports = function (app, express) {
  var apiauthentication = express.Router();

  apiauthentication.post('/login', function (req, res) {
    User.findOne({
      username: req.body.username
    }).select('password').exec(function (err, user) {
      if (err)
        throw err;
      if (!user)
        res.status(401).send({
          description: 'please enter a valid username',
          success: false
        });
      else if (user) {
        var valid = user.comparePasswords(req.body.password);
        if (!valid)
          res.status(401).send({
            description: 'invalid username or password',
            success: false
          });
        else {
          User.findById(user._id, function (err, user) {
            if (err) {
              console.log(err);
              return;
            }
            var token = middleware.createToken(user);
            res.json({
              success: true,
              description: 'sucessfully logged in',
              token: token,
              user
            });
          });
        }
      }
    });
  });

  apiauthentication.get('/me', middleware.requireLogin, function(req, res) {
    var me = req.decoded;
    res.json(me);
});
  return apiauthentication;
}
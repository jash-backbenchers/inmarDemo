var Product = require('../models/product');
var User = require('../models/user');
// /api/v1/location,
// /api/v1/location/{location_id}/department
// /api/v1/location/{location_id}/department/{department_id}/category
// /api/v1/location/{location_id}/department/{department_id}/category/{category_id}/subcategory
// /api/v1/location/{location_id}/department/{department_id}/category/{category_id}/subcategory/{subcategory_id}

var middleware = require('../middleware/middleware');

module.exports = function (app, express) {
  var api = express.Router();
  // ,middleware.requireLogin
  api.post('', function (req, res) {

    let user = new User({
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      mobile:req.body.mobile,
      email:req.body.email,
      username:req.body.username,
      password:req.body.password,
    })

    User.save(function (err, user) {
      res.json(user);
    })

  });

  api.get('/:id',middleware.requireLogin,middleware.requireAuthorisation, function (req, res) {
    User.findById(req.params.id, function (err, user) {
      res.json({user:user});
    })
  });

  api.put('/:id',middleware.requireLogin,middleware.requireAuthorisation, function (req, res) {

    let data = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      mobile:req.body.mobile,
      email:req.body.email,
      username:req.body.username,
    }

    User.findByIdAndUpdate(req.params.id, data, {
      new: true
    }, function (err, user) {
      res.json(user);
    })

  });

  api.delete('/:id',middleware.requireLogin,middleware.requireAuthorisation, function (req, res) {

    User.findByIdAndRemove(req.params.id, function (err, user) {
      res.json(user);
    })

  });


  return api;
}
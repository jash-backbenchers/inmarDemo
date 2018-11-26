var Product = require('../models/product');

var middleware = require('../middleware/middleware');

module.exports = function (app, express) {
  var apiproduct = express.Router();
  // ,middleware.requireLogin
  apiproduct.post('',middleware.requireLogin, function (req, res) {

    let product = new Product({
      sku: req.body.product.sku,
      name: req.body.product.name,
      location: req.body.product.location,
      department: req.body.product.department,
      category: req.body.product.category,
      subcategory: req.body.product.subcategory
    })

    product.save(function (err, product) {
      res.json(product);
    })

  });

  apiproduct.get('/:id',middleware.requireLogin, function (req, res) {
    Product.findById(req.params.id, function (err, product) {
      res.json(product);
    })
  });

  apiproduct.put('/:id',middleware.requireLogin, function (req, res) {

    let data = {
      sku: req.body.product.sku,
      name: req.body.product.name,
      location: req.body.product.location,
      department: req.body.product.department,
      category: req.body.product.category,
      subcategory: req.body.product.subcategory
    }

    Product.findByIdAndUpdate(req.params.id, data, {
      new: true
    }, function (err, product) {
      res.json(product);
    })

  });

  apiproduct.delete('/:id',middleware.requireLogin, function (req, res) {

    Product.findByIdAndRemove(req.params.id, function (err, product) {
      res.json(product);
    })

  });

  return apiproduct;
}
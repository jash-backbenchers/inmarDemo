var Product = require('../models/product');
var async = require('async');

// /api/v1/location,
// /api/v1/location/{location_id}/department
// /api/v1/location/{location_id}/department/{department_id}/category
// /api/v1/location/{location_id}/department/{department_id}/category/{category_id}/subcategory
// /api/v1/location/{location_id}/department/{department_id}/category/{category_id}/subcategory/{subcategory_id}

var middleware = require('../middleware/middleware');

module.exports = function (app, express) {
  var api = express.Router();
  api.get('/location', middleware.requireLogin, function (req, res) {
    var query = {}
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort: {}
    };

    if (req.query.sortField && req.query.sortOrder) {
      options.sort[req.query.sortField] = req.query.sortOrder + 'ing'
    }
    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')

    Product.paginate(query, options, function (err, products) {
      if (err) {
        console.log(err);
        res.status(500).send({
          description: 'Internal server error',
          success: false
        });
      } else {
        res.status(200).json(products);
      }
    })
  });

  api.get('/location/:location_id/department', middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort: {}
    };

    if (req.query.sortField && req.query.sortOrder) {
      options.sort[req.query.sortField] = req.query.sortOrder + 'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')

    Product.paginate(query, options, function (err, products) {
      if (err) {
        console.log(err);
        res.status(500).send({
          description: 'Internal server error',
          success: false
        });
      } else {
        res.status(200).json(products);
      }
    })
  });

  api.get('/location/:location_id/department/:department_id/category', middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort: {}
    };

    if (req.query.sortField && req.query.sortOrder) {
      options.sort[req.query.sortField] = req.query.sortOrder + 'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')

    Product.paginate(query, options, function (err, products) {
      if (err) {
        console.log(err);
        res.status(500).send({
          description: 'Internal server error',
          success: false
        });
      } else {
        res.status(200).json(products);
      }
    })
  });

  // ,middleware.requireLogin
  api.get('/location/:location_id/department/:department_id/category/:category_id/subcategory', middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id,
      category: req.params.category_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort: {}
    };

    if (req.query.sortField && req.query.sortOrder) {
      options.sort[req.query.sortField] = req.query.sortOrder + 'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')

    Product.paginate(query, options, function (err, products) {
      if (err) {
        console.log(err);
        res.status(500).send({
          description: 'Internal server error',
          success: false
        });
      } else {
        res.status(200).json(products);
      }
    })
  });

  api.get('/location/:location_id/department/:department_id/category/:category_id/subcategory/:subcategory_id', middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id,
      category: req.params.category_id,
      subcategory: req.params.subcategory_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort: {}
    };

    if (req.query.sortField && req.query.sortOrder) {
      options.sort[req.query.sortField] = req.query.sortOrder + 'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')

    Product.paginate(query, options, function (err, products) {
      if (err) {
        console.log(err);
        res.status(500).send({
          description: 'Internal server error',
          success: false
        });
      } else {
        res.status(200).json(products);
      }
    })
  });

  api.get('/tree', middleware.requireLogin, function (req, res) {
    var hierarchy = ['location', 'department', 'category', 'subcategory']

    function flatToTree(parent_id, testData) {
      var parent = hierarchy[parent_id]
      var dataMap1 = testData.reduce(function (map, node) {
        (map[node[parent]] || (map[node[parent]] = [])).push(node);
        return map;
      }, {});
      Object.keys(dataMap1).map(child_name => {
        dataMap1[child_name] = (hierarchy[parent_id + 1]) ? flatToTree(parent_id + 1, dataMap1[child_name]) : []
      })
      return dataMap1;
    }

    function toD3treeFormat(object) {
      var d3Tree = []
      Object.keys(object).map(key => {
        var item =(Object.keys(object[key]).length)?{name:key,children: toD3treeFormat(object[key])}:{name:key}
        d3Tree.push(item)
      })
      return d3Tree
    }

    Product.find({}, function (err, testData) {
      if (err) {
        res.json(err)
      } else {
        var tree = flatToTree(0, testData)
        var d3tree = toD3treeFormat(tree)
        var tree = {
          name: 'master_hierarchy',
          children: d3tree
        }
        res.json(tree);
      }
    });

  });

  api.get('/departments', middleware.requireLogin, function (req, res) {

    const aggregatorOpts = [{
      $group: {
        _id: "$department",
        count: {
          $sum: 1
        }
      }
    }]

    Product.aggregate(aggregatorOpts).exec(function (err, departments) {
      res.json(departments);
    });

  });

  api.get('/settings', middleware.requireLogin, function (req, res) {
    var queries = [];
    //location,department,category,subcategory
    //0
    queries.push(function (cb) {
      Product.find().distinct('location', function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //1
    queries.push(function (cb) {
      Product.find().distinct('department', function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //2
    queries.push(function (cb) {
      Product.find().distinct('category', function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //3
    queries.push(function (cb) {
      Product.find().distinct('subcategory', function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    async.parallel(queries, function (err, docs) {
      // if any query fails
      if (err) {
        res.status(401).json({
          success: true,
          description: 'internal server error',
          err
        });
      }

      var result = {
        location: docs[0],
        department: docs[1],
        category: docs[2],
        subcategory: docs[3],
      }
      res.json({
        success: true,
        description: 'statsand recent are',
        result
      });
    })

  });

  return api;
}
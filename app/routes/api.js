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
  api.get('/location',middleware.requireLogin, function (req, res) {
    var query={}
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort:{}
    };

    if(req.query.sortField&&req.query.sortOrder){
      options.sort[req.query.sortField]=req.query.sortOrder+'ing'
    }
    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);  
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')
  
    Product.paginate(query,options, function (err, products) {
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

  api.get('/location/:location_id/department',middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort:{}
    };
    
    if(req.query.sortField&&req.query.sortOrder){
      options.sort[req.query.sortField]=req.query.sortOrder+'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);    
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')
  
    Product.paginate(query,options, function (err, products) {
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

  api.get('/location/:location_id/department/:department_id/category',middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort:{}
    };
    
    if(req.query.sortField&&req.query.sortOrder){
      options.sort[req.query.sortField]=req.query.sortOrder+'ing'
    }

    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);    
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')
  
    Product.paginate(query,options, function (err, products) {
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
  api.get('/location/:location_id/department/:department_id/category/:category_id/subcategory',middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id,
      category: req.params.category_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort:{}
    };
    
    if(req.query.sortField&&req.query.sortOrder){
      options.sort[req.query.sortField]=req.query.sortOrder+'ing'
    }
  
    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);  
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')
  
    Product.paginate(query,options, function (err, products) {
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

  api.get('/location/:location_id/department/:department_id/category/:category_id/subcategory/:subcategory_id',middleware.requireLogin, function (req, res) {
    var query = {
      location: req.params.location_id,
      department: req.params.department_id,
      category: req.params.category_id,
      subcategory: req.params.subcategory_id
    }
    var options = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.page_size),
      sort:{}
    };
    
    if(req.query.sortField&&req.query.sortOrder){
      options.sort[req.query.sortField]=req.query.sortOrder+'ing'
    }
  
    Object.keys(query).forEach(k => (query[k] === 'null') && delete query[k]);  
    console.log('-----')
    console.log(query)
    console.log(options)
    console.log('getting paged data')
  
    Product.paginate(query,options, function (err, products) {
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

  api.get('/tree',middleware.requireLogin, function (req, res) {
    function parentchildren(parent, child, testData) {
      var dataMap1 = testData.reduce(function (map, node) {
        (map[node[parent]] || (map[node[parent]] = [])).push(node);
        return map;
      }, {});
      var tree = []
      Object.keys(dataMap1).map((key) => {
        var dataMap = dataMap1[key].reduce(function (map, node) {
          (map[node[child]] || (map[node[child]] = [])).push(node);
          return map;
        }, {});
        tree.push({
          name: key,
          children: dataMap
        })
      })
      return tree
    }
    //   Location,Department,Category,SubCategory

    Product.find({},middleware.requireLogin, function (err, testData) {
      if (err) {
        res.json(err)
      } else {
        var first = parentchildren('location', 'department', testData);
        first.map((location, index) => {
          Object.keys(location.children).map(department_name => {
            var category = location.children[department_name];
            var data = parentchildren('category', 'subcategory', category)
            var items = []
            data.children = data.map(category => {
              items = Object.keys(category.children).map((item) => {
                return {
                  name: item
                }
              })
              return {
                name: category.name,
                children: items
              };
            })
            first[index].children[department_name] = data.children;
          })
        })
        
        
        var finaltree=[]
        first.map((location,lindex)=>{
          var new_location={name:location.name,children:[]}
          Object.keys(location.children).map((department_key,dindex)=>{
            new_location.children.push({
              name:department_key,
              children:location.children[department_key]
            })
          })
          finaltree.push(new_location)
        })

        var tree={
          name:'master_hierarchy',
          children:finaltree
        }
        res.json(tree);
      }
    });

  });

  api.get('/departments',middleware.requireLogin, function (req, res) {

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

  api.get('/settings',middleware.requireLogin, function (req, res) {
    var queries=[];
    //location,department,category,subcategory
    //0
    queries.push(function (cb) {     
      Product.find().distinct('location',function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //1
    queries.push(function (cb) {     
      Product.find().distinct('department',function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //2
    queries.push(function (cb) {     
      Product.find().distinct('category',function (err, docs) {
        if (err) {
          throw cb(err);
        }
        // do some stuff with docs & pass or directly pass it
        cb(null, docs);
      });
    })

    //3
    queries.push(function (cb) {     
      Product.find().distinct('subcategory',function (err, docs) {
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

      var result={
        location:docs[0],
        department:docs[1],
        category:docs[2],
        subcategory:docs[3],
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
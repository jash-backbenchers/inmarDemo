const csv = require('csvtojson');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.database, function (err) {
    if (err)
        console.log(err);
    else
        console.log('connected to database');
});
const User = require('../app/models/user');
const Product = require('../app/models/product');

function insertUsers() {

    var user = new User({
        first_name: 'jaswanth',
        last_name: 'chodavarapu',
        mobile: '9502082481',
        email: 'jaswanth.chodavarapu@gmail.com',
        username: 'admin',
        password: '12345',
    });
    user.save(function (err, userx) {
        if (err) {
            console.log(err)
        } else {
            console.log(userx)
        }
    })
}

function insertProducts() {
    let productsarr = [];

    const csvFilePath = 'loadData/Data.csv';
    csv()
        .fromFile(csvFilePath)
        .on('csv', (csvRow) => {
            let element = csvRow;
            productsarr.push({
                sku: element[0],
                name: element[1],
                location: element[2],
                department: element[3],
                category: element[4],
                subcategory: element[5]
            })
        })
        .on('done', (error) => {
            Product.insertMany(productsarr, function (err, results) {
                if (err) {
                    console.log(err);
                    mongoose.connection.close()
                } else {
                    console.log(results);
                    mongoose.connection.close()
                }
            });
        }, );
}


if (process.argv[2] == 'flush') {
    User.remove({}, function (err) {
        console.log('User collection removed')
    });
    Product.remove({}, function (err) {
        console.log('Product collection removed')
        mongoose.connection.close()
    });
}
if (process.argv[2] == 'load') {
    insertUsers();
    insertProducts();
}
var express = require("express"); //using the express framework, require is the keyword to include the library and store it into the express variable
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express
var db = require('./db-connections');
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.

app.route('/insert_product').post( function (req,res){
    var sql = "INSERT INTO `e-commerce`.product(name,description,price,category_id,picture) VALUES(?,?,?,?,?)";

    var parameter = [req.body.name,req.body.description,req.body.price,req.body.category_id,req.body.picture]

    db.query(sql,parameter, function(error,result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
    
});

app.route('/product').get(function (req, res) {
    // the database retrieval code
    // implement SELECT query to retrieve all RESTAURANTS
    var sql = "SELECT product.id, product.name, product.description, product.price, category.name AS category_name, product.picture  FROM `e-commerce`.product JOIN `e-commerce`.category ON product.category_id = category.id ";
    // perform query to database from web server
    db.query(sql, function(error, result){
        if(error){
            throw error;
        } else {
            // return result as json
            res.json(result);
        }
    });
});

app.route('/product/:id').get(function (req, res) {
    // the database retrieval code
    // implement SELECT query to retrieve all RESTAURANTS
    var sql = "SELECT * FROM `e-commerce`.product WHERE id = ?";
    // perform query to database from web server
    var parameter = [req.params.id]
    db.query(sql,parameter,function(error, result){
        if(error){
            throw error;
        } else {
            // return result as json
            res.json(result);
        }
    });
});

app.route('/product/:id').put(function (req, res) {
    // Implement UPDATE query to modify restaurant information
    var sql = "UPDATE `e-commerce`.product SET name = ?, description = ?, price = ?,category_id = ?, picture = ? WHERE id = ?";

    // Parameters to replace the ?
    var parameters = [req.body.name, req.body.description,req.body.price,req.body.category_id,req.body.picture, req.params.id];

    db.query(sql, parameters, function (error, result) {
        if (error) {
            throw error;
        } else {
            // Return result as JSON
            res.json(result);
        }
    });
});

app.route('/category').get(function (req,res){

    var sql = "SELECT * FROM `e-commerce`.category";

    db.query(sql, function (error, result) {
        if (error) {
            throw error;
        } else {
            // Return result as JSON
            res.json(result);
        }
    });
});

app.route('/product/:id').delete( function (req,res){

    //the database retrieval code
    //implement SELECT query to retrieve all RESTAURANTS
    var sql = "DELETE FROM `e-commerce`.product where id = ? ";

    //the parameter to replace the ?
    var parameter = [req.params.id]

    db.query(sql,parameter, function(error,result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
    
});


app.use(express.static("./public"));

app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console Try running your web server using node.js (Terminal or Code runner) Stop and restart server when there is a code change To stop the server - terminal(Ctrl-C) , Code Runner(press stop button )



function loadProductData(){
    //initialize a new XMLHttpRequest object
    var request = new XMLHttpRequest();

    var productArray = [];

    //set the request method 'GET' and request URL '/restaurant
    request.open("GET","/product",true);


    request.onload = function(){
        //retrieve response and store it in restaurantArray
        productArray = JSON.parse(request.responseText);
        newContentProduct(productArray)
    }
    //send request
    request.send();
}

function newContentProduct(productArray){
    // retrieve dynamic restaurant data container via id
    var dynamicProductList = document.getElementById("dynamicProductDataList")

    //Start with an empty string to build the new HTML
    let newContent = "<table><tr>";

    //loop through the restaurantArray elements
    for (let i = 0; i < productArray.length;i++){
        //Log the current restaurant object for this restaurant
        console.log(productArray[i])
        //Build up the HTML string for the restaurant
        newContent+=
            "<td><img style = 'border-radius:10px;' src ='" + productArray[i].picture +"' width = '230' height = '200'><br>"+
            "<p class = 'product_name'>" +  productArray[i].name + "</p>" +
            "<p>Price:<b> $ " + productArray[i].price + "</b></p>"+
            "<p><b>Category:</b> " + productArray[i].category_name+ "</p>"+
            "<p><b>Description:</b>" + productArray[i].description+ "</p>" +
            "<a style ='text-decoration: none' href = 'http://localhost:8080/update_product.html?id=" + productArray[i].id + "'>"+ "<button class = 'pill'>Edit</button>"+ "</a><br>"
            "</td>";
        //After every third restaurant, end the current row and start a new row
        if ((i+1) % 3 === 0 && i < productArray.length-1){
            newContent += "</tr><tr>"
        }

    }
    newContent += "</tr></table>";

    dynamicProductList.innerHTML = newContent;
}


function loadCategoryData(){
    //initialize a new XMLHttpRequest object
    var request = new XMLHttpRequest();

    var categoryArray = [];

    //set the request method 'GET' and request URL '/restaurant
    request.open("GET","/category",true);


    request.onload = function(){
        //retrieve response and store it in restaurantArray
        categoryArray = JSON.parse(request.responseText);
        newContent_category(categoryArray)
    }
    //send request
    request.send();
}

function newContent_category(categoryArray){
    // retrieve dynamic restaurant data container via id
    var dynamicCategoryList = document.getElementById("dynamicCategoryDataList")

    //Start with an empty string to build the new HTML
    let newContent = "<label for = 'category'>Category: </label><select name = 'category_id' id = 'category_id'>";

    //loop through the restaurantArray elements
    for (let i = 0; i < categoryArray.length;i++){
        //Log the current restaurant object for this restaurant
        console.log(categoryArray[i])
        //Build up the HTML string for the restaurant
        newContent+=
            "<option value = " + categoryArray[i].id + ">" + categoryArray[i].name + "</option>"
    
        }

    newContent += "</select>";

    dynamicCategoryList.innerHTML = newContent;
};





function addProductData(){
    var product = new Object();// create an object to be sent over
    product.name = document.getElementById("name").value; 
    product.description = document.getElementById("description").value; 
    product.price = document.getElementById("price").value; 
    product.category_id = document.getElementById("category_id").value; 
    product.picture = document.getElementById("picture").value;


    var request = new XMLHttpRequest(); // new HttpRequest instance to send student data
    request.open("POST","http://localhost:8080/insert_product",true); // Use the HTTP POST method to send data to server
    request.setRequestHeader("Content-Type","application/json");// for Post method we have specify the content type

    request.onload = function() {
        alert(request.responseText)
    };
    request.send(JSON.stringify(product));// Convertthe student object to string in JSON FORMAT TO BE SENT OVER
}

function loadProductDetail(){
        //initialize a new XMLHttpRequest object
        var request = new XMLHttpRequest();

        var params = new URLSearchParams(location.search);
        var id = params.get("id")
    
        console.log("id"+id);
        var product;
        var urlLink = "/product/" + id;
        //set the request method 'GET' and request URL '/restaurant'
        request.open("GET",urlLink,true);
    
        //callback function when data is returned from the web server
        request.onload = function(){
            //retrieve response and store it in restaurantArray
            product = JSON.parse(request.responseText);
            console.log(product)
            setProductDetail(product[0])
        }
        //send request
        request.send();
}

function setProductDetail(product){
    
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("category_id").value = product.category_id;
    document.getElementById("picture").value = product.picture;
    document.getElementById('deleteButton').setAttribute("restId", product.id)


}

function updateOnLoad(){
    loadCategoryData();
    loadProductDetail();

}

function updateProductData(){
    var product = new Object();// create an object to be sent over
    var params = new URLSearchParams(location.search);
    var id = params.get("id")
    
    product.name = document.getElementById("name").value; 
    product.description = document.getElementById("description").value; 
    product.price = document.getElementById("price").value; 
    product.category_id = document.getElementById("category_id").value; 
    product.picture = document.getElementById("picture").value;
    

    var request = new XMLHttpRequest(); // new HttpRequest instance to send student data
    var urlLink = "/product/" + id;
    request.open("PUT",urlLink, true) //Use the HTTP POST method to send data to server
    request.setRequestHeader("Content-Type","application/json"); // for Post method we have specify the content type

    request.onload = function(){
        alert(request.responseText)
    };
    request.send(JSON.stringify(product)); //Convert the student object to string in JSON format to be send over
}

function deleteProductData(item){
    var id = item.getAttribute("restId");
    console.log("delete id" + id)
    //initialize a new XMLHttpRequest object 
    var request = new XMLHttpRequest();

    //set the request method 'delete' and request URL '/restaurant/id'
    request.open("delete","/product/"+id, true)
    
    //callback function when data is returned from web server
    request.onload = function(){
        location.href = "/home.html"
    }
    //send request
    request.send();
}



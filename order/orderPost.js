"use-strict";

const Order = {
    name: "",
    table: "",
    time: "",
    bartender: "",
    beers: [],
    paymentMethod: "",
}

function postOrder(beerOrder) {
    createOrderObject(beerOrder);
    // POST order to restdb / json file / other
}

function createOrderObject(beerOrder) {
    // Create an Order object with the provided user info
    let order = new Object(Order);
    order.name = document.getElementById("name").value;
    order.table = document.getElementById("table").value;
    order.time = getOrderTime();
    order.bartender = randomBartender();
    order.beers = beerOrder;
    if(document.getElementById("cash").checked) {
        order.paymentMethod = "cash";
    }else {
        order.paymentMethod = "card";
    }
    console.log(order);
}
  
function getOrderTime() {
    // Get the current time in hours, minutes and seconds
    let date = new Date();
    var time = date.getHours() + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
    return time;
}

function checkTime(num) {
    // Add a leading 0
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function randomBartender() {
    // Return a random value from the bartenders array
    const bartenders = ["Jonas", "Dannie", "Peter", "Klaus"];
    let bartender = bartenders[Math.floor(Math.random()*bartenders.length)];
    return bartender;
}

















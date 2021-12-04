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
    const order = createOrderObject(beerOrder);
    // POST order to restdb / json file / other
    post(order);
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
    order.codeNumber = document.getElementById("codeNumber").innerHTML;
    return order;
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


function post(order) {
    const postData = JSON.stringify(order);
    fetch("https://foobar-0910.restdb.io/rest/order", {
    method: "post",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "61a85d22c7048f219d10f87b",
        "cache-control": "no-cache"
    },
    body: postData
    })
    .then(res => res.json())
    .then(data => {console.log(order);});
}

function get() {
    fetch("https://foobar-0910.restdb.io/rest/order", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "61a85d22c7048f219d10f87b",
          "cache-control": "no-cache"
        } })
        .then(e => e.json())
        .then(e => {database = e;});
}

function getCodeNumbers() {
    let usedCodeNumbers = [];
    for(let i=0; i < database.length; i++) {
        usedCodeNumbers.push(database[i].codeNumber);
    }
    return usedCodeNumbers;
}







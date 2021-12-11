"use-strict";
window.addEventListener('load', start);

function start() {
    // Hide waiting animation
    setTimeout(function() {
        document.getElementById("waiting").style.display = "none";
        document.getElementById("waiting").style.pointerEvents = "none";
        document.getElementById("beer").classList.remove("beerAni");
    }, 6000);

    // Get the data from the database
    get();

    // Manage the ordering process
    manageOrder();

    // Reset the status
    resetStatus();
}

/**
 * OBJECTS AND GLOBAL VARIABLES
 */

const BeerType = {
    name: "",
    price: 0,
    selected: 0
}

const Order = {
    name: "",
    table: "",
    time: "",
    bartender: "",
    beers: [],
    paymentMethod: "",
    codeNumber: 0
}

let beerTypes = [];
let beerOrder = [];

let database;


/**
 * GET ORDERS DATA FROM DATABASE
 */

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
  // Get all code number from the database
  let usedCodeNumbers = [];
  for(let i=0; i < database.length; i++) {
      usedCodeNumbers.push(database[i].codeNumber);
  }
  return usedCodeNumbers;
}


/**
 * CREATE MAIN PAGE
 */

async function manageOrder() {
    // Reset everything
    reset();

    // Fetch data
    const response = await fetch('https://foo-bar-3.herokuapp.com/');
    const data = await response.json();

    // Map the beer types in an array
    beerTypes = [];
    beerTypes = data.storage.map(createBeerTypeObject);
    
    // Display the beer panel
    createBeerPannel();
}

function createBeerTypeObject(data) {
    // Create a beer type object with the fetched data
    const beerType = Object.create(BeerType);
    beerType.name = data.name;
    beerType.image = 'images/' + data.name.split(' ').join('').toLowerCase() + '.png';
    beerType.price = 40;
    beerType.selected = 0;
    return beerType;
}

function createBeerPannel() {
    removeAllNodes(document.getElementById("beerPanel"));
    // Fill the beerPanel section with a template
    const template = document.getElementById("beerType-template").content;
    for(let i=0; i < beerTypes.length; i++) {
        const panel = template.cloneNode(true);
        panel.querySelector("h1").innerHTML = beerTypes[i].name;
        panel.querySelector("img").src = beerTypes[i].image;
        panel.querySelector(".price").innerHTML = beerTypes[i].price + " dkk";

        panel.querySelector("a").id = "numBeers"+i;
        panel.querySelector("a").innerHTML = 0;

        panel.getElementById("decreaseBtn").value = i;
        decreaseBeers(panel);
        panel.getElementById("increaseBtn").value = i;
        increaseBeers(panel);

        document.getElementById("beerPanel").appendChild(panel);
    };
}

function removeAllNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function decreaseBeers(panel) {
    // On click decrease the number of beers in the correct array position while it is over 0
    const input = panel.getElementById("decreaseBtn");
    const numBeers = panel.querySelector("a");
    input.addEventListener('click', function() {
        for(let i=0; i < beerTypes.length; i++) {
            if(parseInt(input.value) === i && beerTypes[i].selected > 0) {
                beerTypes[i].selected--;
                numBeers.innerHTML = beerTypes[i].selected;
            }
        }
        changeBeerAmount();
    });
}

function increaseBeers(panel) {
    // On click increase the number of beers in the correct array position
    const input = panel.getElementById("increaseBtn");
    const numBeers = panel.querySelector("a");
    input.addEventListener('click', function() {
        for(let i=0; i < beerTypes.length; i++) {
            if(parseInt(input.value) === i) {
                beerTypes[i].selected++;
                numBeers.innerHTML = beerTypes[i].selected;
            }
        }
        changeBeerAmount();
    });
}

function changeBeerAmount() {
    // Calculate the total amount of selected beers
    const total = sumSelectedBeers();
    // Change the number of total beers
    document.getElementById("selection").innerHTML = total;
    // Able and disable the order button
    if(total === 0) {
        document.getElementById("orderBtn").disabled = true;
    }else {
        document.getElementById("orderBtn").disabled = false;
    }
}

function sumSelectedBeers() {
    // Sum all the selected beers
    let total = 0;
    for(let i=0; i < beerTypes.length; i++) {
        total += beerTypes[i].selected;
    }
    return total;
}

/**
 * BUTTON EVENTS
 */

function showOrderForm() {
    // Hide the main page and show the form
    document.getElementById("main").style.display = "none";
    document.getElementById("order").style.display = "block";
    // Get and show the selected beers
    getBeerOrder();
    showBeerOrder();
}

function getBeerOrder() {
    beerOrder = [];
    for(let i=0; i < beerTypes.length; i++) {
        if(beerTypes[i].selected > 0) {
            const beer = {};
            beer.type = beerTypes[i].name;
            beer.number = beerTypes[i].selected;
            beer.singlePrice = beerTypes[i].price;
            beer.totalPrice = beerTypes[i].price * beerTypes[i].selected;
            beerOrder.push(beer);
        }
    }
}

function showBeerOrder() {
    removeAllNodes(document.getElementById("orderPanel"));
    // Insert the order in orderPanel with a template
    const template = document.getElementById("order-beerType-template").content;
    for(let i=0; i < beerOrder.length; i++) {
        const panel = template.cloneNode(true);
        panel.querySelector(".type").innerHTML = beerOrder[i].type;
        panel.querySelector(".price").innerHTML = "&nbsp;&nbsp;&nbsp;" + beerOrder[i].totalPrice + " dkk&nbsp;&nbsp;(" + beerOrder[i].number + "x" + beerOrder[i].singlePrice + ")&nbsp;";
        document.getElementById("orderPanel").appendChild(panel);
    };
}

function editOrder() {
    // Return to main page
    document.getElementById("order").style.display = "none";
    document.getElementById("main").style.display = "block";
}

function confirmPayment() {
    // Check the form values
    if(orderValidation()) {
        manageConfirmMessage(beerOrder);
    }
}

function manageConfirmMessage() {
    // Show waiting animation
    waitingAnimation();

    // Hide the order form and show the confirm message
    document.getElementById("orderForm").style.display = "none";
    document.getElementById("confirmMessage").style.display = "block";

    // Generate a code number for the order
    generateCodeNumber();

    // Post the order to the database
    postOrder();
}

function generateCodeNumber() {
    // Get all the used code numbers from the database
    let usedCodeNumbers = getCodeNumbers();
    // Create a unique code number
    let num;
    do {
        num = Math.floor(1000 + Math.random() * 9000);
    } while(usedCodeNumbers.includes(num));
    // Display the new code number
    document.getElementById("codeNumber").innerHTML = num;
}

// Manage payment checkboxes
function selectPaymentType(input) {
    // On checkbox click disable the checkbox
    input.disabled = true;
    // Uncheck the other checkboxes
    const checkboxes = document.querySelectorAll(".paymentType");
    checkboxes.forEach(function(checkbox) {
        if(checkbox != input) {
            checkbox.checked = false;
            checkbox.disabled = false;
        }
    });
    // Show or hide the card info form
    if(input.value === "card") {
        document.getElementById("cardInfo").style.display = "block";
    }else {
        document.getElementById("cardInfo").style.display = "none";
    }
}

// Force an input text to only admit numbers
function onlyNumbers(input) {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function checkDate(input) {
    // Add a leading 0 to the date
    if(!isNaN(input.value) && input.value.length === 1) {
        input.value = "0" + input.value;
    }
    // Check that the date is not bigger than the max value
    if(input.value > input.max) {
        input.value = input.max;
    }
    // Check that the date is not smaller that the min value
    if(input.value < input.min) {
        input.value = input.min;
    }
}

// Clipboard API implementation
async function copyCode() {
    await navigator.clipboard.writeText(document.getElementById("codeNumber").innerHTML);
}

async function pasteCode() {
    const read = await navigator.clipboard.readText();
    document.getElementById("code").value = read;
}




/** 
 * POST ORDER
 */

 function postOrder() {
    const order = createOrderObject();
    // POST order to restdb / json file / other
    post(order);
}

function createOrderObject() {
    // Create an Order object with the provided user info
    let order = new Object(Order);
    order.name = document.getElementById("name").value;
    order.table = document.getElementById("table").value;
    order.time = getCurrentTime();
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
  
function getCurrentTime() {
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
    .then(data => {console.log("order submitted");});
}


/**
 * RESET PAGE
 */

 function reset() {
    // Reset the number of beers selected
    document.getElementById("selection").innerHTML = "0";
    document.getElementById("orderBtn").disabled = true;

    // Reset form inputs
    document.querySelectorAll(".field").forEach(function(e) {
        e.value = "";
    });

    // Reset checkboxes
    document.getElementById("cash").checked = true;
    document.getElementById("cash").disabled = true;
    document.getElementById("card").checked = false;
    document.getElementById("card").disabled = false;
    document.getElementById("cardInfo").style.display = "none";

    // Reset visual
    document.getElementById("orderForm").style.display = "block";
    document.getElementById("confirmMessage").style.display = "none";
    document.getElementById("order").style.display = "none";
    document.getElementById("main").style.display = "block";

    document.getElementById("statusMessage").style.display = "none";
    document.getElementById("statusForm").style.display = "block";
    document.getElementById("status").style.display = "none";
}


/**
 * ANIMATIONS
 */

function waitingAnimation() {
    document.getElementById("waiting").style.display = "block";
    document.getElementById("waiting").style.pointerEvents = "all";
    document.getElementById("beer").classList.add("beerAni");
    setTimeout(function() {
        document.getElementById("waiting").style.display = "none";
        document.getElementById("waiting").style.pointerEvents = "none";
        document.getElementById("beer").classList.remove("beerAni");
    }, 6000);
}



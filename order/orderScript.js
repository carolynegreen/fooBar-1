"use-strict";
window.addEventListener('load', start);

const BeerType = {
    name: "",
    price: 0,
    selected: 0
}

function start() {
    // Reset the page
    reset();

    // Get the data from the database
    get();

    // Get and display the data
    manageOrder();

    // Show the status
    manageStatus();
}

async function manageOrder() {
    // Fetch data
    const response = await fetch('https://foo-bar-3.herokuapp.com/');
    const data = await response.json();

    // Map the beer types in an array
    let beerTypes = "";
    beerTypes = data.storage.map(createBeerTypeObject);
    
    // Display the beer panel
    createBeerPannel(beerTypes);

    // Go to the order form
    goToOrder(beerTypes);
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

function createBeerPannel(beerTypes) {
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
        decreaseBeers(panel, beerTypes);
        panel.getElementById("increaseBtn").value = i;
        increaseBeers(panel, beerTypes);

        document.getElementById("beerPanel").appendChild(panel);
    }
}

function decreaseBeers(panel, beerTypes) {
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
        changeBeerAmount(beerTypes);
    });
}

function increaseBeers(panel, beerTypes) {
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
        changeBeerAmount(beerTypes);
    });
}

function changeBeerAmount(beerTypes) {
    // Calculate the total amount of selected beers
    const total = sumSelectedBeers(beerTypes);
    // Change the number of total beers
    document.getElementById("selection").innerHTML = total;
    // Able and disable the order button
    if(total === 0) {
        document.getElementById("orderBtn").disabled = true;
    }else {
        document.getElementById("orderBtn").disabled = false;
    }
}

function sumSelectedBeers(beerTypes) {
    // Sum all the selected beers
    let total = 0;
    for(let i=0; i < beerTypes.length; i++) {
        total += beerTypes[i].selected;
    }
    return total;
}










function goToOrder(beerTypes) {
    // On click go to the order form
    document.getElementById("orderBtn").addEventListener('click', function() {
        manageOrderForm(beerTypes);
    });
}

function manageForm() {
    // Hide the main page and show the form
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";

    // Return to the main page
    editOrder();

    // Get and show the selected beers
    const beerOrder = getBeerOrder(beerTypes);

    // Confirm the payment
    confirmPayment(beerOrder);
}

function editOrder() {
    // On click return to the main page
    document.getElementById("editBtn").addEventListener('click', function() {
        document.getElementById("form").style.display = "none";
        document.getElementById("main").style.display = "block";
    });
}

function getBeerOrder(beerTypes) {
    let beerOrder = [];
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
    showBeerOrder(beerOrder);
    return beerOrder;
}

function showBeerOrder(beerOrder) {
    removeAllNodes(document.getElementById("orderPanel"));
    // Insert the order in orderPanel with a template
    const template = document.getElementById("order-beerType-template").content;
    for(let i=0; i < beerOrder.length; i++) {
        const panel = template.cloneNode(true);
        panel.querySelector(".type").innerHTML = beerOrder[i].type;
        panel.querySelector(".price").innerHTML = "(" + beerOrder[i].number + "x" + beerOrder[i].singlePrice + ") " + beerOrder[i].totalPrice;
        document.getElementById("orderPanel").appendChild(panel);
    }
}

function removeAllNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function confirmPayment(beerOrder) {
    // On click check the form values, post the orders and show a confirm message
    document.getElementById("confirmBtn").addEventListener('click', function() {
        if(orderValidation()) {
            manageConfirmMessage(beerOrder);
        }
    });
}

function manageConfirmMessage(beerOrder) {
    // Hide the order form and show the confirm message
    document.getElementById("orderForm").style.display = "none";
    document.getElementById("confirmMessage").style.display = "block";

    // Generate a code number for the order
    generateCodeNumber();

    // Post the order to the database
    postOrder(beerOrder);

    // Return to the main page
    returnToMain();
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

function returnToMain() {
    // On click reset page and return to the main page
    document.getElementById("returnBtn").addEventListener('click', function() {
        start();
    });
}

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

    // Reset visual
    document.getElementById("orderForm").style.display = "block";
    document.getElementById("confirmMessage").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("main").style.display = "block";
}

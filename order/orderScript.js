"use-strict";

start();

function start() {
    // Reset page visual
    resetVisual();
    // Get and display the data
    loadData();
    // Make an order
    goToOrder();
    // Show the status
    showStatus();
}

function goToOrder() {
    // On click go to the order form
    document.getElementById("orderBtn").addEventListener('click', function() {
        document.getElementById("main").style.display = "none";
        document.getElementById("form").style.display = "block";
        // Form validation and functioning
        manageForm();
    });
}

function manageForm() {
    const beerOrder = createBeerOrderArray();
    // Display the beer order
    displayBeerOrder(beerOrder);
    // Return to order
    editOrder();
    // Pay
    confirmPayment(beerOrder);
    // Return to the main page after pay
    returnToMain();
}

function createBeerOrderArray() {
    let beerOrder = [];
    for(let i=0; i < beerTypes.length; i++) {
        if(selection[i] > 0) {
            const beer = {};
            beer.type = beerTypes[i].name;
            beer.number = selection[i];
            beer.singlePrice = beerTypes[i].price;
            beer.totalPrice = beerTypes[i].price * selection[i];
            beerOrder.push(beer);
        }
    }
    return beerOrder;
}

function displayBeerOrder(beerOrder) {
    document.getElementById("orderInfo").innerHTML = "";
    for(let i=0; i < beerOrder.length; i++) {
        const item = document.createElement("div");
        item.innerHTML = beerOrder[i].type;

        const text = document.createElement("span");
        text.innerHTML = "(" + beerOrder[i].number + "x" + beerOrder[i].singlePrice + ") " + beerOrder[i].totalPrice;
        item.appendChild(text);

        document.getElementById("orderInfo").appendChild(item);
    }
}

function editOrder() {
    // On click return to the main page
    document.getElementById("editBtn").addEventListener('click', function() {
        document.getElementById("form").style.display = "none";
        document.getElementById("main").style.display = "block";
    });
}

function confirmPayment(beerOrder) {
    // On click check the form values
    document.getElementById("confirmBtn").addEventListener('click', function() {
        if(orderValidation()) {
            generateCode();
            postOrder(beerOrder);
            document.getElementById("orderForm").style.display = "none";
            document.getElementById("confirmMessage").style.display = "block";
        }
    });
}

// Generate a random code for each order (lacks validation part)
function generateCode() {
    document.getElementById("codeNumber").innerHTML = Math.floor(1000 + Math.random() * 9000);
}

// Clipboard API implementation
async function copyCode() {
    await navigator.clipboard.writeText(document.getElementById("codeNumber").innerHTML);
}

function returnToMain() {
    // On click reset page and return to the main page
    document.getElementById("returnBtn").addEventListener('click', function() {
        reset();
    });
}

function reset() {
    // Change the number of each beer type
    document.querySelectorAll(".numBeers").forEach(function(e) {
        e.innerHTML = 0;
    });

    // Reset the number of beers selected
    for(let i=0; i < selection.length; i++) {
        selection[i] = 0;
    }
    document.getElementById("selection").innerHTML = "0";
    document.getElementById("orderBtn").disabled = true;

    // Reset order information
    while (document.getElementById("orderInfo").firstChild) {
        document.getElementById("orderInfo").removeChild(document.getElementById("orderInfo").firstChild);
    }
    
    // Reset form inputs
    document.querySelectorAll(".field").forEach(function(e) {
        e.value = "";
    });

    // Reset checkboxes
    document.getElementById("cash").checked = true;
    document.getElementById("cash").disabled = true;
    document.getElementById("card").checked = false;
    document.getElementById("card").disabled = false;

    // Reset page visual
    resetVisual();
}


function resetVisual() {
    // Reset visual
    document.getElementById("statusForm").style.display = "block";
    document.getElementById("statusMessage").style.display = "none";
    document.getElementById("status").style.display = "none";
    document.getElementById("orderForm").style.display = "block";
    document.getElementById("confirmMessage").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("main").style.display = "block";
}



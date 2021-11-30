"use-strict";

start();

function start() {
    // Get and display the data
    loadData();
    // Make an order
    goToOrder();
    // Form validation and functioning
    manageForm();
}

function goToOrder() {
    // On click go to the order form
    document.getElementById("orderBtn").addEventListener('click', function() {
        document.getElementById("main").style.display = "none";
        document.getElementById("form").style.display = "block";
    });
}

function manageForm() {
    // Return to order
    editOrder();
    // Pay
    confirmPayment();
    // Return to the main page after pay
    returnToMain();
}

function editOrder() {
    // On click return to the main page
    document.getElementById("editBtn").addEventListener('click', function() {
        document.getElementById("form").style.display = "none";
        document.getElementById("main").style.display = "block";
    });
}

function confirmPayment() {
    // On click check the form values
    document.getElementById("confirmBtn").addEventListener('click', function() {
        if(orderValidation()) {
            document.getElementById("orderForm").style.display = "none";
            document.getElementById("confirmMessage").style.display = "block";
        }
    });
}

function returnToMain() {
    // On click reset page and return to the main page
    document.getElementById("returnBtn").addEventListener('click', function() {
        resetOrderForm();
    });
}

function resetOrderForm() {
    // Reset form inputs
    document.querySelectorAll("input:not([type=checkbox])").forEach(function(e) {
        e.value = "";
    });
    document.querySelectorAll("select").forEach(function(e) {
        e.value = "0";
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




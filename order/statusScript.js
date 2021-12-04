"use-strict";

function manageStatus() {
    // Reset status
    resetStatus();
    // Show status
    goToStatus();
    // Exit status
    exitStatus();
}

function goToStatus() {
    // On click show the status log in
    document.getElementById("statusBtn").addEventListener('click', function() {
        manageStatusForm();
    });
}

function exitStatus() {
    // On click return to the main page
    document.querySelectorAll(".exitBtn").forEach(function(btn) {
        btn.addEventListener('click', function() {
            resetStatus();
        })
    });
}

function resetStatus() {
    // Reset the code field
    document.getElementById("code").value = "";
    // Reset the page visual
    document.getElementById("statusMessage").style.display = "none";
    document.getElementById("statusForm").style.display = "block";
    document.getElementById("status").style.display = "none";
    document.getElementById("main").style.display = "block";
}

function manageStatusForm() {
    document.getElementById("status").style.display = "block";
    document.getElementById("main").style.display = "none";
    // Validate status form and show status message
    logIn();
}

function logIn() {
    document.getElementById("logInBtn").addEventListener('click', function() {
        if(statusValidation()) {
            manageStatusMessage();
        }
    });
}

function manageStatusMessage() {
    // Show the status message
    document.getElementById("statusMessage").style.display = "block";
    document.getElementById("statusForm").style.display = "none";
    // Get the information for the user
    getOrderInfo();
}

function statusValidation() {
    // Get all the used code numbers from the database
    let usedCodeNumbers = getCodeNumbers();
    // Check that the code number exists
    const input = document.getElementById("code");
    if(input.value.length === 0 || !(usedCodeNumbers.includes(parseInt(input.value)))) {
        input.style.border = "4px solid #DCA413";
        document.getElementById("codeError").style.visibility = "visible";
        return false;
    }else {
        input.style.border = "none";
        document.getElementById("codeError").style.visibility = "hidden";
        return true;
    }
}

function getOrderInfo() {
    // Get the user information
    let text = "";
    const input = document.getElementById("code");
    for(let i=0; i < database.length; i++) {
        if(parseInt(input.value) === database[i].codeNumber) {
            showOrderInfo(database[i]);
        }
    }
}

function showOrderInfo() {
    // Display the user order info
    const userInfo = document.getElementById("userInfo");
    userInfo.querySelector(".name").innerHTML = order.name;
    let beers = "You have ordered ";
    for(let i=0; i < order.beers.length; i++) {
        beers += "<br>" + order.beers[i].type + " x " + order.beers[i].number;
    }
    userInfo.querySelector(".order").innerHTML = beers;
    userInfo.querySelector(".table").innerHTML = "To table " + order.table;
    userInfo.querySelector(".timer").innerHTML = "TIMER";
    userInfo.querySelector(".bartender").innerHTML = "Your order is being prepared by " + order.bartender;
    userInfo.querySelector(".queue").innerHTML = "There are 3 orders before you";
}

"use-strict";

function orderValidation() {
    // Hide errors on change
    changeError();
    // Check all form inputs
    const check1 = checkName();
    const check2 = checkTable();
    const check3 = paymentValidation();
    if(check1 && check2 && check3) {
        return true;
    }else {
        return false;
    }
}

function showError(name) {
    // Show an error message and change the border color
    document.getElementById(name).style.border = "4px solid #DCA413";
    document.querySelector("."+name+"Error").style.visibility = "visible";
}

function hideError(name) {
    // Hide an error message and reset the border color
    document.getElementById(name).style.border = "none";
    document.querySelector("."+name+"Error").style.visibility = "hidden";
}

function changeError() {
    document.querySelectorAll(".field").forEach(function(e) {
        e.addEventListener('change', function () {
            hideError(e.id);
        });
    });
}

function checkName() {
    // Check that the name input is not empty
    const input = document.getElementById("name");
    if(input.value.length === 0) {
        showError("name");
        return false;
    }else {
        hideError("name");
        return true;
    }
}

function checkTable() {
    // Check that the user has selected a table
    const input = document.getElementById("table");
    if(input.value === "") {
        showError("table");
        return false;
    }else {
        hideError("table");
        return true;
    }
}

function paymentValidation() {
    // Check that the user has selected cash or card
    if(!document.getElementById("cash").checked) {
        // Check that the card inputs are correct
        const check1 = checkCardNumber();
        const check2 = checkCardHolder();
        const check3 = checkCardExpiryDate();
        const check4 = checkCardSecurityNumber();
        if (check1 && check2 && check3 && check4) {
            return true;
        }else {
            return false;
        }
    }else {
        return true;
    }
}

function checkCardNumber() {
    // Check that the card number has the correct length
    const input = document.getElementById("cardNumber");
    if(input.value.length != 16) {
        showError("cardNumber");
        return false;
    }else {
        hideError("cardNumber");
        return true;
    }
}

function checkCardHolder() {
    // Check that the card holder input is not empty
    const input = document.getElementById("cardHolder");
    if(input.value.length === 0) {
        showError("cardHolder");
        return false;
    }else {
        hideError("cardHolder");
        return true;
    }
}

function checkCardExpiryDate() {
    const date = new Date();
    const month = document.getElementById("cardExpiryMonth");
    const year = document.getElementById("cardExpiryYear");

    // Check that the date inputs are not empty or smaller than the current date
    if((month.value.length != 2 || year.value.length != 2) || (month.value < date.getMonth() && parseInt(year.value) <= (date.getFullYear()-2000))) {
        showError("cardExpiryMonth");
        showError("cardExpiryYear");
        return false;
    }else {
        hideError("cardExpiryMonth");
        hideError("cardExpiryYear");
        return true;
    }
}

function checkCardSecurityNumber() {
    // Check that the security number input has the correct length
    const input = document.getElementById("cardSecurityNumber");
    if(input.value.length != 3) {
        showError("cardSecurityNumber");
        return false;
    }else {
        hideError("cardSecurityNumber");
        return true;
    }
}


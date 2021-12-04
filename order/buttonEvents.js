"use-strict";

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

function onlyNumbers(input) {
    // Force an input text to only admit numbers
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

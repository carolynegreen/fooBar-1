"use-strict";

function showStatus() {
    document.getElementById("statusBtn").addEventListener('click', function() {
        document.getElementById("main").style.display = "none";
        document.getElementById("status").style.display = "block";
        logIn();
    });
}

function logIn() {
    document.getElementById("logInBtn").addEventListener('click', function() {
        if(statusValidation()) {
            getOrderInfo();
            document.getElementById("statusForm").style.display = "none";
            document.getElementById("statusMessage").style.display = "block";
            exitStatus();
        }
    });
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
            text = "Welcome " + database[i].name + "!" + 
            "<br>" + "Your bartender for today is " + database[i].bartender;
        }
    }
    // Display the user information
    document.getElementById("userInfo").innerHTML = text;
}

function exitStatus() {
    document.getElementById("exitBtn").addEventListener('click', function() {
        document.getElementById("code").value = "";
        resetVisual();
    });
}










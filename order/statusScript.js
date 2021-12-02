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
            document.getElementById("statusForm").style.display = "none";
            document.getElementById("statusMessage").style.display = "block";
            exitStatus();
        }
    });
}

function statusValidation() {
    // Check that the code number exists
    const input = document.getElementById("code");
    if(input.value.length === 0) {
        input.style.border = "4px solid #DCA413";
        document.getElementById("codeError").style.visibility = "visible";
        return false;
    }else {
        input.style.border = "none";
        document.getElementById("codeError").style.visibility = "hidden";
        return true;
    }
}

function exitStatus() {
    document.getElementById("exitBtn").addEventListener('click', function() {
        document.getElementById("code").value = "";
        resetVisual();
    });
}










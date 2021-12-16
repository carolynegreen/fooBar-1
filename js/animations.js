"use-strict";

function waitingAnimation() {
    document.querySelector(".waiting").style.display = "block";
    document.querySelector(".waiting").style.pointerEvents = "all";
    document.querySelector(".beerIcon").classList.add("beerAni");
    setTimeout(function() {
        document.querySelector(".waiting").style.display = "none";
        document.querySelector(".waiting").style.pointerEvents = "none";
        document.querySelector(".beerIcon").classList.remove("beerAni");
    }, 6000);
}



"use-strict";

let timer;

function resetStatus() {
  clearInterval(timer);
  // Reset the code field
  document.getElementById("code").value = "";
  hideError("code");
  // Reset the page visual
  document.getElementById("statusMessage").style.display = "none";
  document.getElementById("statusForm").style.display = "block";
  document.getElementById("status").style.display = "none";
  document.getElementById("main").style.display = "block";
}

function showStatusForm() {
  document.getElementById("status").style.display = "block";
  document.getElementById("main").style.display = "none";
  closeNav();
}

function logIn() {
  if (statusValidation()) {
    manageStatusMessage();
  }
}

function statusValidation() {
  // Get all the used code numbers from the database
  let usedCodeNumbers = getCodeNumbers();
  // Check that the code number exists
  const input = document.getElementById("code");
  if (
    input.value.length === 0 ||
    !usedCodeNumbers.includes(parseInt(input.value))
  ) {
    showError("code");
    return false;
  } else {
    hideError("code");
    return true;
  }
}

function manageStatusMessage() {
  // Show waiting animation
  // waitingAnimation();

  // Show the status message
  document.getElementById("statusMessage").style.display = "block";
  document.getElementById("statusForm").style.display = "none";

  // Get the information for the user
  getOrderInfo();
}

function getOrderInfo() {
  // Get the user information
  const input = document.getElementById("code");
  for (let i = 0; i < database.length; i++) {
    if (parseInt(input.value) === database[i].codeNumber) {
      showOrderInfo(database[i]);
    }
  }
}

function showOrderInfo(order) {
  // Display the user order info
  const userInfo = document.getElementById("userInfo");
  userInfo.querySelector(".name").innerHTML = "Welcome to Foobar<br>" + order.name + "!";

  if (compareDates(order.date)) {
    userInfo.querySelector(".message").innerHTML = "Your order is being prepared";
    let beers = "Your have ordered";
    for (let i = 0; i < order.beers.length; i++) {
      beers += "<br>" + order.beers[i].type + " x " + order.beers[i].number;
    }
    userInfo.querySelector(".order").innerHTML = beers;
    userInfo.querySelector(".table").innerHTML = "For Table " + order.table;
    userInfo.querySelector(".bartender").innerHTML = "Your order is being prepared by " + order.bartender;
    showTimeDifference(order);
  } else {
    userInfo.querySelector(".message").innerHTML = "This order information is unavailable, place an order to receive a new code";
    userInfo.querySelector(".order").innerHTML = "";
    userInfo.querySelector(".table").innerHTML = "";
    userInfo.querySelector(".bartender").innerHTML = "";
    userInfo.querySelector(".timer").innerHTML = "";
  }
}

function compareDates(date) {
  const currentDate = getCurrentDate();
  let curr = currentDate.split("-");
  let dd1 = parseInt(curr[0]);
  let mm1 = parseInt(curr[1]);
  let yy1 = parseInt(curr[2]);

  let fin = date.split("-");
  let dd2 = parseInt(fin[0]);
  let mm2 = parseInt(fin[1]);
  let yy2 = parseInt(fin[2]);

  if (yy1 != yy2) {
    return false;
  } else {
    if (mm1 != mm2) {
      return false;
    } else {
      if (dd1 != dd2) {
        return false;
      } else {
        return true;
      }
    }
  }
}

function showTimeDifference(order) {
  const estimate = getOrderTime(order.beers);
  timer = setInterval(function () {
    const currentTime = getCurrentTime();
    const finalTime = calculateFinalTime(order.time, estimate);
    console.log(finalTime);
    calculateTimeDifference(currentTime, finalTime);
  }, 1000);
}

function getOrderTime(beers) {
  let estimate = 5;
  for(let i=0; i<beers.length; i++) {
    estimate += beers[i].number * 3;
  }
  return estimate;
}

function calculateFinalTime(time, estimate) {
  const split = time.split(":");
  let hh = parseInt(split[0]);
  let mm = parseInt(split[1]);
  let ss = parseInt(split[2]);

  mm = mm + estimate;
  if (mm >= 60) {
    hh = hh + 1;
    mm = mm - 60;
  }
  return hh + ":" + mm + ":" + ss;
}

function calculateTimeDifference(current, final) {
  let curr = current.split(":");
  let hh1 = parseInt(curr[0]);
  let mm1 = parseInt(curr[1]);
  let ss1 = parseInt(curr[2]);

  let fin = final.split(":");
  let hh2 = parseInt(fin[0]);
  let mm2 = parseInt(fin[1]);
  let ss2 = parseInt(fin[2]);

  let served = false;
  if (hh1 > hh2) {
    served = true;
  } else {
    if(mm1 > mm2) {
      if(hh1 === hh2) {
        served = true;
      }else {
        mm2 = mm2 + 60;
      }
    }

    if(mm1 <= mm2) {
      if(ss1 > ss2) {
        if(mm1 === mm2) {
          served = true;
        }else {
          ss2 = ss2 + 60;
          mm2 = mm2 - 1;
        }
      }
    }
  }

  if(served) {
    document.getElementById("userInfo").querySelector(".timer").innerHTML = "00:00";
    document.getElementById("userInfo").querySelector(".message").innerHTML = "Your order has already been served";
  }else {
    let mm3 = mm2 - mm1;
    let ss3 = ss2 - ss1;
    document.getElementById("userInfo").querySelector(".timer").innerHTML = leadingZero(mm3) + ":" + leadingZero(ss3);
    document.getElementById("userInfo").querySelector(".message").innerHTML = "Your order is being prepared";
  }
}






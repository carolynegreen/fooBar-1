"use strict";
let url = "https://kea2sem-4cc6.restdb.io/rest/foobar";

const options = {
  method: "GET",
  headers: {
    "x-apikey": "61aa0b02c7048f219d10f8de",
  },
};

let slideIndex = 0;

fetch(url, options)
  .then((res) => res.json())
  .then((response) => {
    showProduct(response);
    showSlides();
    setInterval(fetchData, 2000);
  })
  .catch((err) => {
    console.error(err);
  });

function showProduct(items) {
  //grab the template
  const template = document.getElementById("slides-template").content;
  //loop through data.comments
  for (let i = 0; i < items.length; i++) {
    const copy = template.cloneNode(true);
    copy.querySelector(".numbertext").innerHTML = i + 1 + " / " + items.length;
    copy.querySelector("img").src = items[i].BeerImg;
    copy.querySelector("h2").innerHTML = items[i].BeerName;
    copy.querySelector(".text").innerHTML = items[i].BeerDescription;
    document.querySelector(".slideshow-container").appendChild(copy);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.value = i;
    document.querySelector(".slides-dots").appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      currentSlide(dot.value);
    });
  });
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

start();

function start() {
  fetchData();
  setInterval(fetchData, 2000);
  function currentSlide(value) {
    slideIndex = value;
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      if (value === i) {
        slides[i].style.display = "block";
      } else {
        slides[i].style.display = "none";
      }
    }
  }
}

async function fetchData() {
  // Fetch data
  const response = await fetch("https://foo-bar-3.herokuapp.com/");
  const data = await response.json();

  let totalOrders = data.queue.length + data.serving.length;
  document.getElementById("numOrders").innerHTML = totalOrders;
  document.getElementById("progress").style.width =
    (10 - totalOrders) * 10 + "%";

  getOrderContent(data.serving);
  getActiveBartenders(data.bartenders);

  setTimeout(fetchData, 2000); // Fetch data every 2 seconds
}

function getOrderContent(serving) {
  const orders = document.getElementById("orders");
  removeAllNodes(orders);
  for (let i = 0; i < serving.length; i++) {
    const order = document.createElement("div");
    order.classList.add("order");
    for (let j = 0; j < serving[i].order.length; j++) {
      const div = document.createElement("div");
      div.classList.add("image");
      div.style.backgroundImage =
        "url(/images/" +
        serving[i].order[j].split(" ").join("").toLowerCase() +
        ".png)";
      order.appendChild(div);
    }
    orders.appendChild(order);
  }
}

function removeAllNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

function getActiveBartenders(bartenders) {
  let active = document.getElementById("bar_ten");
  active.innerHTML = "";
  for (let i = 0; i < bartenders.length; i++) {
    if (bartenders[i].status === "WORKING") {
      active.innerHTML += bartenders[i].name + "<br>";
    }
  }
}

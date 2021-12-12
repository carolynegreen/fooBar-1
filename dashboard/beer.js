"use strict";
let url = "https://kea2sem-4cc6.restdb.io/rest/foobar";

const BeerType = {
  amount: 0,
};

const options = {
  method: "GET",
  headers: {
    "x-apikey": "61aa0b02c7048f219d10f8de",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((response) => {
    showProduct(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showProduct(product) {
  console.log(product);
  //data.comments
  //grab the template
  const template = document.querySelector(".single-product-template").content;
  //loop through data.comments
  product.forEach((product) => {
    console.log(product);
    const copy = template.cloneNode(true);
    copy.querySelector("img").src = `${product.BeerImg}`;
    copy.querySelector("h2").textContent = `${product.BeerName}`;
    copy.querySelector("p").textContent = `${product.BeerDescription}`;
    copy.querySelector(".label").textContent = `${product.BeerType}`;
    copy.querySelector(".alc").textContent = "ABV " + `${product.alc}` + "%";
    document.querySelector("section").appendChild(copy);
  });
}

//Show beer percentages
function createBeerPercentage() {
  fetch("https://foo-bar-3.herokuapp.com/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function appendData(data) {
    const template = document.querySelector(".keg").content;
    for (var i = 0; i < data.length; i++) {
      let copy = document.querySelector(".keg");
      copy.querySelector(".keg").textContent = `${data.storage.amount}`;
      template.appendChild(copy);
    }
  }
}

// function start() {
//   console.log(beers);
//   displayBeers();
// }

// function displayBeers() {
//   console.log(beers);
//   //data.comments
//   //grab the template
//   const template = document.querySelector(".single-product-template").content;
//   //loop through data.comments
//   beers.forEach((beer) => {
//     console.log(beer);
//     const copy = template.cloneNode(true);
//     copy.querySelector(".name").textContent = `${beer.name}`;
//     copy.querySelector(
//       ".description"
//     ).textContent = `${beer.description.overallImpression}`;
//     copy.querySelector(".label").textContent = `${beer.category}`;
//     copy.querySelector(".alc").textContent = `${beer.alc}`;
//     copy.querySelector("img").src = "/images/" + beer.label;
//     document.querySelector("section").appendChild(copy);
//   });
// }

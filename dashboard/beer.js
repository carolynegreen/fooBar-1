"use strict";
let url = "https://kea2sem-4cc6.restdb.io/rest/foobar";

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
    copy.querySelector("h3").textContent = `${product.BeerType}`;
    copy.querySelector(".alc").textContent = `${product.alc}` + " ABV";
    document.querySelector("section").appendChild(copy);
  });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
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

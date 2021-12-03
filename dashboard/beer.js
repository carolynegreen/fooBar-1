"use strict";

fetch("https://kea2sem-4cc6.restdb.io/rest/foobar", {
  method: "GET",
  headers: {
    "x-apikey": "61aa0b02c7048f219d10f8de",
  },
})
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
    copy.querySelector("p").textContent = product.BeerDescription;
    document.querySelector("section").appendChild(copy);
  });
}

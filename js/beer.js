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
    setInterval(fetchData, 2000);
  })
  .catch((err) => {
    console.error(err);
  });

function showProduct(product) {
  //data.comments
  //grab the template
  const template = document.querySelector(".single-product-template").content;
  //loop through data.comments
  product.forEach((product) => {
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
async function fetchData() {
  // Fetch data
  const response = await fetch("https://foo-bar-3.herokuapp.com/");
  const data = await response.json();

  const kegs = document.querySelectorAll(".keg");
  for (let i = 0; i < data.storage.length; i++) {
    kegs[i].style.backgroundImage = setBeerPercentage(data.storage[i].amount);
  }
}

function setBeerPercentage(numBeers) {
  if (numBeers > 8) {
    return "url(assets/keg_full.png)";
  } else if (numBeers > 6) {
    return "url(assets/keg_1.png)";
  } else if (numBeers > 4) {
    return "url(assets/keg_2.png)";
  } else {
    return "url(assets/keg_empty.png)";
  }
}

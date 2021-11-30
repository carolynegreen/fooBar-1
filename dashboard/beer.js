"use strict";

loadData();

async function loadData() {
  const response = await fetch("https://foo-bar-3.herokuapp.com/");
  const data = await response.json();
  console.log(data);
  beerTaps();
}

function beerTaps() {}

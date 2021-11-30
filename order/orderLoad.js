"use-strict";

async function loadData() {
    // Fetch the data
    const response = await fetch('https://foo-bar-3.herokuapp.com/');
    const data = await response.json();
    console.log(data);
}


"use-strict";

const BeerType = {
    name: "",
    price: 0
}
let beerTypes = [];
let selection;

async function loadData() {
    // Fetch data
    const response = await fetch('https://foo-bar-3.herokuapp.com/');
    const data = await response.json();

    // Map the beer types in an array
    beerTypes = data.storage.map(createBeerTypeObject);
    selection = new Array(beerTypes.length).fill(0);
    
    // Display the beer panel
    createBeerPannel();
}

function createBeerTypeObject(data) {
    // Create a beer type object with the fetched data
    const beerType = Object.create(BeerType);
    beerType.name = data.name;
    beerType.image = 'images/' + data.name.split(' ').join('').toLowerCase() + '.png';
    beerType.price = 40;
    return beerType;
}

function createBeerPannel() {
    for(let i=0; i < beerTypes.length; i++) {
        // Create a beer panel for each beer type
        const panel = document.createElement("div");
        panel.classList.add("beerType");

        const title = document.createElement("h1");
        title.innerHTML = beerTypes[i].name;
        panel.appendChild(title);

        const image = document.createElement("img");
        // image.src = beerTypes[i].image;
        panel.appendChild(image);

        const price = document.createElement("div");
        price.innerHTML = beerTypes[i].price + " dkk";
        panel.appendChild(price);

        const decreaseBtn = document.createElement("button");
        decreaseBtn.classList.add("decreaseBtn");
        decreaseBtn.classList.add("btn-sign");
        decreaseBtn.type = "button";
        decreaseBtn.innerHTML = "-";
        decreaseBtn.value = i;
        panel.appendChild(decreaseBtn);

        const numBeers = document.createElement("a");
        numBeers.id = "numBeers"+i;
        numBeers.classList.add("numBeers");
        numBeers.innerHTML = 0;
        numBeers.value = 0;
        panel.appendChild(numBeers);
        
        const increaseBtn = document.createElement("button");
        increaseBtn.classList.add("increaseBtn");
        increaseBtn.classList.add("btn-sign");
        increaseBtn.type = "button";
        increaseBtn.innerHTML = "+";
        increaseBtn.value = i;
        panel.appendChild(increaseBtn);

        // Add each panel to the beer panel
        document.getElementById("beerPanel").appendChild(panel);
    }

    // Button events
    document.querySelectorAll(".decreaseBtn").forEach(decreaseBeers);
    document.querySelectorAll(".increaseBtn").forEach(increaseBeers);
}

function decreaseBeers(e) {
    // Decrease the number of selected beers
    e.addEventListener('click', function() {
        // Change the number of beers in the correct array position while it is over 0
        for(let i=0; i < beerTypes.length; i++) {
            if(parseInt(e.value) === i && selection[i] > 0) {
                selection[i]--;
                changeBeerAmount(i);
            }
        }
    });
}

function increaseBeers(e) {
    // Increase the number of selected beer
    e.addEventListener('click', function() {
        // Change the number of beers in the correct array position
        for(let i=0; i < beerTypes.length; i++) {
            if(parseInt(e.value) === i) {
                selection[i]++;
                changeBeerAmount(i);
            }
        }
    });
}

function changeBeerAmount(i) {
    // Change the number of each beer type
    document.getElementById("numBeers"+i).innerHTML = selection[i];
    // Change the number of total beers
    document.getElementById("selection").innerHTML = selection.reduce(sumArray);
    // Able and disable the order button
    if(document.getElementById("selection").innerHTML === "0") {
        document.getElementById("orderBtn").disabled = true;
    }else {
        document.getElementById("orderBtn").disabled = false;
    }
}

function sumArray(total, num) {
    // Sum all the values of an array
    return total + num;
}






let slideIndex = 0;
showSlides();
fetchData();

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

async function fetchData() {
  const response = await fetch('https://foo-bar-3.herokuapp.com/');
  const data = await response.json();

  let totalOrders = data.queue.length + data.serving.length;
  document.getElementById("numOrders").innerHTML = totalOrders;
  document.getElementById("progress").style.width = (10-totalOrders)*10 + "%";

  getOrderContent(data.serving);
  getActiveBartenders(data.bartenders);

  setTimeout(fetchData, 2000); // Fetch data every 2 seconds
}

function getOrderContent(serving) {
  const orders = document.getElementById("orders");
  removeAllNodes(orders);
  for(let i=0; i<serving.length; i++) {
      const order = document.createElement("div");
      order.classList.add("order");
      for(let j=0; j<serving[i].order.length; j++) {
          const div = document.createElement("div");
          div.classList.add("image");
          div.style.backgroundImage = 'url(/images/' + serving[i].order[j].split(' ').join('').toLowerCase() + '.png)';
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
  for(let i=0; i<bartenders.length; i++) {
      if(bartenders[i].status === "WORKING") {
          active.innerHTML += bartenders[i].name + "<br>";
      }
  }
}

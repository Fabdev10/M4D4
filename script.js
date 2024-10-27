const strive_URL = "https://striveschool-api.herokuapp.com/api/product/"
const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3Nzg1YTVkNzU4NzAwMTUzNzg2MDAiLCJpYXQiOjE3Mjk1OTEzODcsImV4cCI6MTczMDgwMDk4N30.8ChSG5Q3pmTAjBRWQVV137UmYmqsp7NJbexf5cdKM0c"
window.onload = async () => {
  const res = await fetch(strive_URL, {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3Nzg1YTVkNzU4NzAwMTUzNzg2MDAiLCJpYXQiOjE3Mjk1OTEzODcsImV4cCI6MTczMDgwMDk4N30.8ChSG5Q3pmTAjBRWQVV137UmYmqsp7NJbexf5cdKM0c"
    },
  })
  const cards = await res.json()
  console.log(cards)
  const cardswrapper = document.querySelector("#wrapper")
  cards.forEach(element => {
    const cardcontainer = `<div class="col-md-3 col-lg-3 col-sm-6"><div class= "shadow p-3 mt-5 bg-body-tertiary rounded" >
    <img src=${element.imageUrl} class= " card-img-top  object-fit-cover rounded "  style="height: 20rem;"  alt="...">
    <div class="card-body">
      <h5 class="card-title  text-truncate">${element.name}</h5>
      <p class="card-text">Description: ${element.description}</p>
      <p class="card-text">Brand: ${element.brand}</p>
       <p class="card-text">Price: ${element.price} €</p>
      <button class='btn btn-primary' onclick="addToCart('${element.name}', '${element.price}', '${element.id}',event)"> Add to cart </button>
    <a href="./backoffice.html?id=${element._id}" class="btn btn-success">Info</a>
    </div></div></div>`
  cardswrapper.insertAdjacentHTML("beforeend",cardcontainer)  
  })
}
//cart section
const selectedItems = {};
const addToCart = (name, price,id,event) => {
  event.target.classList.replace("btn-primary","btn-secondary")
  alert("Product added to chart")
  const itemId = id
  const itemName = name
  const itemPrice = price
   cart = document.getElementById("cart")
    cart.innerHTML += `
    <li class="list-group-item">${name}, ${price} 
    `
    if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  } else {
    selectedItems[itemId] = {
        name: itemName,
        price:itemPrice, 
        count: 1,
    };
  }updateCart(); }
  function updateCart() {
  cart.innerHTML = '';
  let total = 0; 
  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];
    const listItem = document.createElement('li');
    const quantityContainer = document.createElement('div'); 
    const quantityText = document.createElement('span'); 
    const addButton = document.createElement('button');
    const subtractButton = document.createElement('button');
  
    addButton.textContent = '+';
    subtractButton.textContent = '-';
  
    quantityText.textContent = item.count; 
  
    addButton.addEventListener('click', () => {
        addItem(itemId);
    });
  
    subtractButton.addEventListener('click', () => {
        removeItem(itemId);
    });
  
    const hr = document.createElement('hr');
  
    quantityContainer.appendChild(subtractButton); 
    quantityContainer.appendChild(quantityText); 
    quantityContainer.appendChild(addButton); 
    quantityContainer.appendChild(hr); 
  
    listItem.textContent = `${item.name} - $${item.price * item.count}`;
    listItem.appendChild(quantityContainer); 
    cart.appendChild(listItem);
  
    total += item.price * item.count; 
  }
  
  document.getElementById("total").innerText= `total to pay $${total.toFixed(2)}`; 
  }
  
  function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  }
  updateCart();
  }
  
  function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count--;
    if (selectedItems[itemId].count <= 0) {
        delete selectedItems[itemId];
    }
  }
  updateCart();
  }
  const emptyCart = () => {
    document.getElementById("cart").innerHTML = "";
    const totale = document.getElementById("total");
    totale.innerText = "Total Amount: $0"
  }
  

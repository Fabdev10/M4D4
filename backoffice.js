const strive_URL = "https://striveschool-api.herokuapp.com/api/product/"
const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3Nzg1YTVkNzU4NzAwMTUzNzg2MDAiLCJpYXQiOjE3Mjk1OTEzODcsImV4cCI6MTczMDgwMDk4N30.8ChSG5Q3pmTAjBRWQVV137UmYmqsp7NJbexf5cdKM0c"
let param = new URLSearchParams(window.location.search)
let id = param.get("id")
window.onload = async () => {
  if (id) {
    const res = await fetch(strive_URL + id, {
      headers: {   
        authorization:
         myKey,
      },
    })
    const cards = await res.json()
    document.querySelector("#name").value = cards.name
    document.querySelector("#description").value = cards.description
    document.querySelector("#imageUrl").value = cards.imageUrl
    document.querySelector("#brand").value = cards.brand
    document.querySelector("#price").value = cards.price
  } }
const createNew = async () => {
  const cards = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,}
  let res = await fetch(strive_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
       myKey, },
    body: JSON.stringify(cards), })
  if (res.ok) {
    alert("Product created,check on the homepage")}}
const editProduct = async () => {
  const cards = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,}
  let res = await fetch(strive_URL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization:
       myKey,},
    body: JSON.stringify(cards), })
  if (res.ok) {
    alert("Product created,check on the homepage") }}
const deleteProduct = async () => {
  let res = await fetch(strive_URL + id, {
    method: "DELETE",
    headers: {  
      authorization:
       myKey,},})
  if (res.ok) {
    alert("Product deleted") }}

document.querySelector(".btn.btn-success").addEventListener("click",createNew)
document.querySelector(".btn.btn-primary").addEventListener("click",editProduct)
document.querySelector(".btn.btn-danger").addEventListener("click",deleteProduct)
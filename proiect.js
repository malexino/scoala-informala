let dataStorage = 'https://online-shop-12368-default-rtdb.firebaseio.com/';
let id = window.location.search.substr(4);
let listaProduse = [];
let produs = {};
let cartStr = localStorage.getItem("cart");
let cart = JSON.parse(cartStr);

function removeClass1 () {
    var element = document.getElementById("id01");
    element.classList.remove("hidden");
}
async function getListaProduse() {
    document.querySelector("#loading").classList.remove("hidden");
    let response = await fetch (dataStorage + ".json");
    listaProduse = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    drawProduse();
    countCart();
}
function drawProduse(){
    let str = "";
    for (let [i,produs] of Object.entries(listaProduse)) {
        str+=`
            <div class="productCard">
                    <h3>${produs.nume}</h3>
                    <img src="${produs.imagine}" class="product-img" alt="${produs.nume}"/>
                    <h4>${produs.pret}.00 RON</h4>
                    <div class="viewBtn"><a class="viewButton" href="product.html?id=${i}">View</a></div>
            </div>
        `
    }
    document.querySelector(".pageContent").innerHTML = str;
}
async function getProdus() {
    document.querySelector("#loading").classList.remove("hidden");
    let response = await fetch (dataStorage + id + ".json");
    produs = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    drawDetalii();
}
function drawDetalii() {
    document.querySelector(".name").innerText = produs.nume;
	document.querySelector(".picture").src = produs.imagine;
    document.querySelector(".size").innerHTML = `<strong>Marime:</strong> ${produs.marime}`;
    document.querySelector(".color").innerHTML = `<strong>Culoare:</strong> ${produs.culoare}`;
    document.querySelector(".price").innerHTML = `<strong>Pret:</strong> ${produs.pret}.00 RON`;
    document.querySelector(".stock").innerHTML = `<strong>In stoc:</strong> ${produs.stoc} buc`;
    document.querySelector(".description").innerHTML = `
    <p><strong>Descriere produs:</strong></p>
    <p>${produs.descriere}</p>
    `
}

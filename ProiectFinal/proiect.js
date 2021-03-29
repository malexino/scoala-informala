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
function addToCart() {
    let poza = produs.imagine;
    let nume = produs.nume;
    let quantity = document.querySelector("#articleQuantity").value;
    quantity = Number(quantity);
    let pret = produs.pret;
    let stoc = produs.stoc;
    let cartStr = localStorage.getItem("cart");
    let cart = [];
	if(cartStr !== null){
		cart = JSON.parse(cartStr);
	}
    let found = false;
    for (let item of cart) {
        if (item.id === id) {
            found = true;
            if(item.quantity + quantity > stoc){
                alert("Cantitatea selectata este mai mare decat stocul!");
            } else {
                item.quantity += quantity;
                showToast();
                stoc -= quantity;
            }
            break;
        }
    }
    if (!found && quantity > stoc) {
        alert("Cantitatea selectata este mai mare decat stocul!");
    }
    if (!found &&  quantity <= stoc) {
            cart.push({ 
            id: id, 
            quantity: quantity,
            nume: nume,
            pret: pret,
            poza: poza,
        });
        stoc -= quantity;
        showToast();
    } 
    localStorage.setItem("cart", JSON.stringify(cart));
    countCart();
}
function countCart() {
    let cartStr = localStorage.getItem("cart");
    let cart = [];
	if(cartStr !== null){
		cart = JSON.parse(cartStr);
	}
    let counter = 0;
    for (let i=0; i<cart.length; i++){
        counter += cart[i].quantity;
    }
    document.querySelector(".cart-items").innerHTML = counter;
}
function showToast(){
    let toast = document.getElementById("toast");
    toast.classList.add("show");
    toast.innerHTML = (`Produsul "${produs.nume}" a fost adaugat in cos!`);
    setTimeout(function(){
        toast.classList.remove("show");
    },3000);
}
function drawCart() {
    document.querySelector("#loading").classList.remove("hidden");
    let str = "";
    for (let i=0; i<cart.length; i++){
        str += `
        <div class="cart-item">
            <form>
                <div class="cart-product">
                <a href="details.html?id=${cart[i].id}">
                    <div class="cart-image" style="background-image: url(${cart[i].poza})"></div>
                    <div class="cart-product-info">
                        <p class="cart-product-name">${cart[i].nume}</p>
                </a>
                        <p class="cart-price-sm">${cart[i].pret}.00 RON</p>
                    </div>
                </div>
                <div class="cart-quantity-md">
                    <div class="cart-quantity-controls">
                        <button onclick="decrease('${cart[i].id}');">-</button>
                        <input type="text" class="qty" value="${cart[i].quantity}" />
                        <button onclick="increase('${cart[i].id}');">+</button>
                    </div>
                </div>
                <div class="cart-unit-price">
                    <h4>${cart[i].pret}.00 RON</h4>
                </div>
                <div class="cart-product-subtotal">
                    <h4>${cart[i].pret * cart[i].quantity}.00 RON</h4>
                </div>
                <div class="cart-remove">
                    <input id="stergeBtn" onclick="sterge('${i}');" class="btn" type="button" value="Remove"/>
                </div>
                <div class="cart-controls-sm">
                    <button class="remove" onclick="sterge('${i}');"><i class="fas fa-trash-alt"></i> Remove </button>
                    <div class="cart-quantity-controls-sm">
                        <button onclick="decrease('${cart[i].id}');">-</button>
                        <input type="text" class="qty" value="${cart[i].quantity}"/>
                        <button onclick="increase('${cart[i].id}');">+</button>
                    </div>
                </div>
            </form>
        </div>
        `
    }
    document.querySelector(".cart-item").innerHTML = str;
    document.querySelector("#loading").classList.add("hidden");
    totalCart();
    countCart();
}
function decrease(id) {
    for (let i=0; i<cart.length; i++){
        if (cart[i].id === id && cart[i].quantity > 1 ) {
            cart[i].quantity -= 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}
function increase(id) {
    for (let i=0; i<cart.length; i++){
        if (cart[i].id === id){
            cart[i].quantity += 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}
function sterge(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}
function totalCart() {
    let total = 0;
    for (let i=0; i<cart.length; i++){ 
        let itemQuantity = cart[i].quantity;
        let itemPret = cart[i].pret;
        total += itemQuantity * itemPret;
        document.querySelector("#total").innerHTML = `Total: ${total}.00 RON`;
    }
}

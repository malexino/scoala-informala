let dataStorage = 'https://online-shop-12368-default-rtdb.firebaseio.com/';
let product = {};
let list = [];
let index = window.location.search.substr(4);
let indexEdit = -1;
async function ajax(dataStorage, method, body){
    let response = await fetch(dataStorage + ".json",{
        method: method, 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            }
    });
    return await response.json();
}
function removeClass2 () {
    var element = document.getElementById("id02");
    element.classList.remove("hidden");
}
async function saveProduct() {
    var c = document.getElementById("category");
    var s = document.getElementById("size");
    var l = document.getElementById("color");
    let nume = document.querySelector("[name='name']").value;
    let categorie = c.options[c.selectedIndex].value;
    let marime = s.options[s.selectedIndex].value;
    let culoare = l.options[l.selectedIndex].value;
    let imagine = document.querySelector("[name='picture']").value;
    let descriere = document.querySelector("[name='description']").value;
    let pret = document.querySelector("[name='price']").value;
    let stoc = document.querySelector("[name='stock']").value;
    let newProd = {
        "nume": nume,
        "categorie": categorie,
        "marime": marime,
        "culoare": culoare,
        "imagine": [imagine],
        "descriere": descriere,
        "pret": pret,
        "stoc": stoc
    };
    const response = await fetch(dataStorage + index + ".json", {
        method: "POST",
        body: JSON.stringify(newProd),
        headers: {
            'Content-Type': 'aplication/json'
        }
    });
    product = await response.json();
    window.location = "admin.html";
}
async function getProducts() {
    document.querySelector("#loading").classList.remove("hidden");
    const response = await fetch(dataStorage + index + ".json");
    product = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    drawAdmin();
}
function drawAdmin() {
    let str = "";
    for (let [id, prod] of Object.entries(product)) {
        str += `
            <tr>
                <td>${prod.nume}</td>
                <td>${prod.categorie}</td>
                <td>${prod.marime}</td>
                <td>${prod.culoare}</td>
                <td>${prod.descriere}</td>
                <td>${prod.pret}</td>
                <td>${prod.stoc}</td>
                <td><button class="delete" onclick="removeProduct('${id}')"><i class="fa fa-fw fa-trash"></i> Delete</button></td>
            </tr>
        `
    }
    document.querySelector("#firstTable tbody").innerHTML = str;
}
async function removeProduct(idx){
    if(confirm(`Are you sure you want to remove ${product[idx].nume}?`)){ 
        await ajax(dataStorage + idx, "DELETE")
    }
    getProducts();
    window.location.href = 'admin.html';
}

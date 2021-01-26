let inregistrari = [];
let indexEdit = -1;
function draw(){
    let str = "";
    for (let i = 0; i <= inregistrari.length - 1; i++) {
        str += `
        <tr>
            <td>${inregistrari[i].nume}</td>
            <td>${inregistrari[i].numar}</td>
            <td>
                <img class="edit" src="edit.png" onclick="edit(${i});"/>
            </td>
            <td>
                <img class="delete" src="delete.png" onclick="del(${i});"/>
            </td>
        </tr>
        `
    }
    document.querySelector("#agenda tbody").innerHTML = str;
}
function adauga(){
    let nume = document.querySelector("[name='name']").value;
    let numar = document.querySelector("[name='number']").value;
    if (nume === '' && numar === '') {
        alert ("Please enter Name and Phone Number")
    } else {
        inregistrari.push({
	    nume,
        numar
        });
        draw();
        document.getElementById('name').value='';
        document.getElementById('number').value='';
        document.querySelector("#headTable").classList.remove("hidden");
    }
}
function edit(idx){
    let inregistrare = inregistrari[idx];
    document.querySelector("[name='name']").value=inregistrare.nume;
    document.querySelector("[name='number']").value=inregistrare.numar;
    indexEdit = idx;
    document.querySelector("#editBtn").classList.remove("hidden");
    document.querySelector("#addBtn").classList.add("hidden");
}
function edit2(){
    if(indexEdit === -1) {
        return;
    }
    let inregistrare = inregistrari[indexEdit];
    inregistrare.nume = document.querySelector("[name='name']").value;
    inregistrare.numar = document.querySelector("[name='number']").value;
    draw();
    document.getElementById('name').value='';
    document.getElementById('number').value='';
    document.querySelector("#editBtn").classList.add("hidden");
    document.querySelector("#addBtn").classList.remove("hidden");
}
function del(idx) {
    if (confirm (`Esti sigur ca vrei sa stergi inregistrarea cu numele ${inregistrari[idx].nume} ?`))
        inregistrari.splice(idx,1);
        draw();
}

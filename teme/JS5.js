let inreg = [];
function draw() {
    let str = "";
    let str2 = "";
    for (let i = 0; i < inreg.length; i++) {
        if (inreg[i].action === "marked") {
            str += `<tr>
                    <td  class="markedItem">${inreg[i].item}</td>
                    <td><input id="buyedBtn" type="button" name="buyedBtn" value="Mark as buyed" onclick="buyed(${i});"></td>
                </tr>`
        } else {
            str += `<tr>
                <td class="onTabel">${inreg[i].item}</td>
                <td><input id="buyedBtn" type="button" name="buyedBtn" value="Mark as buyed" onclick="buyed(${i});"></td>
                </tr>`
        }
        document.querySelector("#tabel tbody").innerHTML = str2 + str;
    }
}
function adding() {
    let item = document.querySelector("[name='item']").value;
    if (item === '') {
        alert ("Please enter Item")
    } else {
        inreg.push({item});
        draw();
        document.getElementById('item').value='';
        document.querySelector("#capTabel").classList.remove("hidden");
    }
}
function buyed(idx) {
    for (let i = 0; i < inreg.length; i++) {
        if (i === idx) {
            inreg[i].action = "marked";
        }
    }
    draw();
}
function compare(a, b) {
    let item1 = a.item.toLowerCase();
    let item2 = b.item.toLowerCase();
    let value = 0;
    if (item1 > item2) {
        value = 1;
    }
    else {
        value = -1;
    }
    return value;
}
function sortAsc() {
    inreg.sort(compare);
    draw();
}
function sortDsc() {
    inreg.sort(compare);
    inreg.reverse();
    draw();
}
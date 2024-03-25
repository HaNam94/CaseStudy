let store = new ProductManager();

function showAll() {
    let arr = store.findAll();
    let html =
        `
        <h2>Home</h2>
        <table border="1">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th colspan="2">Action</th>
</tr>
    `
    for (let i = 0; i < arr.length; i++) {
        html +=`
        <tr>
        <td>${arr[i].id}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td><img src="${arr[i].image}"></td>
        <td><button onclick="showFormUpdate(${arr[i].id})">Sửa</button> </td>
        <td><button onclick="remove(${arr[i].id})">Xóa</button> </td>
        </tr>`
    }     `

    html += </table>
        `
    document.getElementById("main").innerHTML = html;
}

function showFormUpdate(id) {
    let oldProduct = store.findProductById(id);
    document.getElementById("main").innerHTML = `
        <h2>Form Update</h2>
        <input type="text" id="id" placeholder="ID" value="${oldProduct.id}" readonly>
        <br>
        <input type="text" id="name" placeholder="NAME" value="${oldProduct.name}">
        <br>
        <input type="text" id="price" placeholder="PRICE" value="${oldProduct.price}">
        <br>
        <input type="text" id="image" placeholder="IMAGE" value="${oldProduct.image}">
        <br>
        <img src="${oldProduct.image}" alt="">
        <br>
        <button onclick="update()">Update</button>
    `
}

function update() {
    let id = +document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let newProduct = new Product(id, name, price, image);
    store.update(id, newProduct);
    alert("Sửa thành công");
    showAll();
}

function remove(id) {
    let isConfirm = confirm("Are you sure?")
    if (isConfirm){
        store.remove(id);
        alert("Xóa thành công");
        showAll();
    }
}
showAll();

function showFormAdd(){
    document.getElementById("main").innerHTML = `
        <h2>Form Add</h2>
        <input type="number" id="id" placeholder="ID">
        <br>
        <input type="text" id="name" placeholder="NAME">
        <br>
        <input type="text" id="price" placeholder="PRICE">
        <br>
        <input type="text" id="image" placeholder="IMAGE">
        <br>
        <button onclick="add()">Add</button>
    `
}

function add(){
    let id = +document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let newProduct = new Product(id, name, price, image);
    store.add(newProduct);
    alert("Thêm thành công");
    showAll();

}
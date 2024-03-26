class ProductManager {
    list;
    constructor() {
        this.list = JSON.parse(localStorage.getItem("students"));
    }
    findAll(){
        return this.list;
    }
    add(newProduct){
        this.list.push(newProduct);
        localStorage.setItem("students", JSON.stringify(this.list));
    }

    findIndexById(id){
        for (let i = 0; i < this.list.length; i++) {
            if (id == this.list[i].id){
                return i;
            }
        }
        return  -1;
    }
    findProductById(id){
        let index = this.findIndexById(id);
        let product = this.list[index];
        return product;
    }
    update(id, newProduct){
        let index = this.findIndexById(id);
        this.list[index] = newProduct;
        localStorage.setItem("students", JSON.stringify(this.list));
    }
}
const ProductManager = require("./ProductManager");
const {camiseta, short, botines} = require("./Productos/products.js");

const newProductManager = new ProductManager("database/db.json");
newProductManager.getProducts()
newProductManager.addProduct();
newProductManager.getProductById()
newProductManager.updateProduct(1, {stock: 40})
newProductManager.deleteProduct(1);
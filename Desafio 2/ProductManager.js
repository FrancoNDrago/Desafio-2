const fs = require("fs")

class ProductManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.filepath, "utf-8");
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log(error);
    }
  }

  async #checkProductCode(code) {
    const fileContent = await this.#readFile();
    return fileContent.find((obj) => obj.code === code)
  }

  async getProducts() {
    const fileContent = await this.#readFile();

    try {
      if (fileContent.length === 0) throw new Error("No se encuentra el producto");
      else console.log(fileContent);
    } catch (error) {
      console.log("No se encuentra el producto");
    }
  }

  async addProduct(obj) {
    const fileContent = await this.#readFile();
    if (await this.#checkProductCode(obj.code)) return console.log(
      "El producto con el codigo: ${obj.code} no fue encontrado"
    )

    try {
      if (fileContent.length !== 0) await fs.promises.writeFile(this.filepath, JSON.stringify([
        ...fileContent, { ...obj, id: fileContent[fileContent.length - 1].id + 1 }], null, 2), "utf-8")
      else await fs.promises.writeFile(this.filepath, JSON.stringify([{ ...obj, id: 1 }]), "utf-8")
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById(id) {
    try {
      const fileContent = await this.#readFile()

      if (!fileContent.find((obj) => obj.id === id)) throw new Error(
        `El producto con el id ${obj.id} no se encuentra`
      )
      else console.log(fileContent.find((obj) => obj.id === id))
    } catch {
      console.log(
        `El producto con el id ${id} no se encuentra`
      )
    }
  }

  async updateProduct(id, obj) {
    try {
      const fileContent = await this.#readFile();
      const productUpdate = fileContent.map((product) => product.id === id ? {
        ...product, ...obj
      } : product)

      if (!fileContent.find((obj) => obj.id)) throw new Error(
        `El producto con el id ${obj.id} no se encuentra`
      )
      else await fs.promises.writeFile(this.filepath, JSON.stringify(productUpdate, null, 2))
    } catch (error) {
      console.log(`El producto con el id ${obj.id} no se encuentra`)
    }
  }

  async deleteProduct(id) {
    try {
      const fileContent = await this.#readFile()
      const filteredProducts = fileContent.filter((product) => product.id !== id);

      if (!fileContent.find((obj) => obj.id === id)) throw new Error(
        `El producto con el id ${id} no se encuentra`
      )
      else await fs.promises.writeFile(this.filepath, JSON.stringify(filteredProducts, null, 2))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductManager;  
export class Product {
  constructor(id, name, description) {
    if (!name || !description) {
      throw new Error("Invalid parameters for Product entity");
    }

    this.id = id;
    this.name = name;
    this.description = description;
  }
}

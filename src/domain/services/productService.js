import { ProductRepository } from "../../infrastructure/repositories/productRepository.js";

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(limit, offset) {
    const products = await this.productRepository.findAll(limit, offset);
    const total = await this.productRepository.count();
    return { products, total };
  }

  async getProductById(id) {
    return this.productRepository.findById(id);
  }

  async createProduct(name, description) {
    return this.productRepository.create({ name, description });
  }

  async updateProduct(id, name, description) {
    return this.productRepository.update({ id, name, description });
  }

  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}

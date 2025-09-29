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

  async createProduct(product) {
    return this.productRepository.create(product);
  }

  async updateProduct(product) {
    return this.productRepository.update(product);
  }

  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}

import { pool } from "../db/connection.js";
import { Product } from "../../domain/entities/Product.js";

export class ProductRepository {
  async findAll(limit, offset) {
    const res = await pool.query("SELECT id, name, description FROM products ORDER BY name LIMIT $1 OFFSET $2", [limit, offset]);
    return res.rows.map((r) => new Product(r.id, r.name, r.description));
  }

  async count() {
    const res = await pool.query("SELECT COUNT(*) FROM products");
    return parseInt(res.rows[0].count, 10);
  }

  async findById(id) {
    const res = await pool.query("SELECT id, name, description FROM products WHERE id=$1", [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Product(row.id, row.name, row.description);
  }

  async create(productData) {
    const product = new Product(null, productData.name, productData.description);
    const res = await pool.query("INSERT INTO products (name, description) VALUES ($1, $2) RETURNING id", [product.name, product.description]);
    product.id = res.rows[0].id;
    return product;
  }

  async update(productData) {
    const product = new Product(productData.id, productData.name, productData.description);
    await pool.query("UPDATE products SET name=$1, description=$2 WHERE id=$3", [product.name, product.description, product.id]);
    return product;
  }

  async delete(id) {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
  }
}

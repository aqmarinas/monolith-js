import { Product } from "../../../domain/entities/Product.js";
import { ProductService } from "../../../domain/services/productService.js";

const productService = new ProductService();

export async function showCreateForm(req, res) {
  res.render("products/create");
}

export async function showEditForm(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  res.render("products/edit", { product });
}

export async function getProducts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  const { products, total } = await productService.getProducts(limit, offset);

  const totalPages = Math.ceil(total / limit);

  res.render("products/index", { products, page, totalPages });
}

export async function getProductById(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  res.render("products/detail", { product });
}

export async function createProduct(req, res) {
  const { name, description } = req.body;
  try {
    const product = new Product(null, name, description);
    await productService.createProduct(product);

    req.flash("success", "Produk berhasil ditambahkan");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menambahkan produk");
    res.redirect("/products/create");
  }
}

export async function updateProduct(req, res) {
  const { name, description } = req.body;

  try {
    const product = new Product(req.params.id, name, description);
    await productService.updateProduct(product);

    req.flash("success", "Produk berhasil diperbarui");
    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal update produk");
    res.redirect("/products/create");
  }
}

export async function deleteProduct(req, res) {
  if (!req.params.id) {
    req.flash("error", "ID produk tidak valid");
    return res.redirect("/products");
  }

  try {
    await productService.deleteProduct(req.params.id);
    req.flash("success", "Produk berhasil dihapus");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menghapus produk");
  }
  res.redirect("/products");
}

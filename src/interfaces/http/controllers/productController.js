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

export async function createProduct(req, res) {
  const { name, description } = req.body;
  try {
    await productService.createProduct(name, description);
    req.flash("success", "Produk berhasil ditambahkan.");
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    console.log(error);
    req.flash("error", "Gagal menambahkan produk.");
    res.redirect("/products/create");
  }
}

export async function getProductById(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }

  res.render("products/detail", { product });
}
export async function updateProduct(req, res) {
  const { name, description } = req.body;
  await productService.updateProduct(req.params.id, name, description);
  req.flash("success", "Produk berhasil diperbarui.");
  res.redirect(`/products/${req.params.id}`);
}

export async function deleteProduct(req, res) {
  await productService.deleteProduct(req.params.id);
  req.flash("success", "Produk berhasil dihapus.");
  res.redirect("/products");
}

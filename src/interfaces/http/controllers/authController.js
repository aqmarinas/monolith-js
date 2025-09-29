import { AuthService } from "../../../domain/services/authService.js";

const authService = new AuthService();

export async function showRegister(req, res) {
  res.render("auth/register");
}

export async function showLogin(req, res) {
  res.render("auth/login");
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    await authService.register({ name, email, password });
    res.render("auth/login");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token } = await authService.login({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1800000,
    });
    console.log("Redirecting to /products");

    res.redirect("/products");
  } catch (error) {
    console.error("Login error:", error);

    req.flash("error", error.message);
    res.redirect("/login");
  }
}

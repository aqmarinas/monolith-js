import { User } from "../../../domain/entities/User.js";
import { AuthService } from "../../../domain/services/authService.js";

const authService = new AuthService();

export async function showRegister(req, res) {
  res.render("auth/register");
}

export async function showLogin(req, res) {
  res.render("auth/login");
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = new User(null, name, email, password);
    await authService.register(user);

    res.render("auth/login");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = new User(null, null, email, password);
    const { token } = await authService.login(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1800000,
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Login error:", error);

    req.flash("error", error.message);
    res.redirect("/login");
  }
}

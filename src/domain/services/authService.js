import bcrypt from "bcrypt";
import { AuthRepository } from "../../infrastructure/repositories/authRepository.js";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register({ name, email, password }) {
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      passwordHash,
    };

    const createdUser = await this.authRepository.createUser(user);

    delete createdUser.password;
    return createdUser;
  }

  async login({ email, password }) {
    const user = await this.authRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error("Wrong credentials");
    }

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    delete user.password;
    return { user, token };
  }
}

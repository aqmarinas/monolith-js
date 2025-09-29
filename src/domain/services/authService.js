import bcrypt from "bcrypt";
import { AuthRepository } from "../../infrastructure/repositories/authRepository.js";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(user) {
    const existingUser = await this.authRepository.findByEmail(user.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    const userData = {
      name: user.name,
      email: user.email,
      passwordHash,
    };

    const createdUser = await this.authRepository.createUser(userData);

    delete createdUser.password;
    return createdUser;
  }

  async login(user) {
    const userData = await this.authRepository.findByEmail(user.email);

    if (!userData || !(await bcrypt.compare(user.password, userData.password))) {
      throw new Error("Wrong credentials");
    }

    const payload = { id: userData.id, email: userData.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    delete userData.password;
    return { userData, token };
  }
}

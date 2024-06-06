import { Injectable } from "@nestjs/common";
import { SignupInput } from "./dto/inputs/signup.input";
import { AuthResponse } from "./types/auth-response.type";
import { UsersService } from "../users/users.service";
import { LoginInput } from "./dto/inputs/login.input";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    const token = "1234";

    return { token, user };
  }

  async login({ email, password }: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(email);
    const token = "1234";
    return { token, user };
  }
}

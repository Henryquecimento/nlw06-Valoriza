import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/password incorrect");
    }

    //md5 generator
    const token = sign(
      {
        email: user.email,
      },
      "ac0b33d67cff472e1616d7525fbe6f14", 
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );
    //1d -> one day

    return token;
  }
}

export { AuthenticateUserService }
import { Application, Request, Response } from "express";
import { createToken } from "../utils/token.utils";
import { isAuthenticated } from "../services/user.service";


export default class AuthController {
  login(req: Request, res: Response) {
    console.log("got a query auth");
    const { email, password } = req.body;
    const user = isAuthenticated(email, password);
    if (!user) {
      const status = 401;
      const message = "Incorrect email or password";
      res.status(status).json({ status, message });
      return;
    }
    const userToReturn = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: email,
      login: {token: ''}
    };

    const access_token = createToken(userToReturn);
    userToReturn.login.token = access_token;
    res.status(200).json(userToReturn);
  }

}
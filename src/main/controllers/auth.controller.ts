import { Application } from "express";
import { createToken } from "../utils/token.utils";
import { isAuthenticated } from "../services/user.service";

export function intitAuthCtrl(server: Application) {
    server.post("/auth/login", (req, res) => {
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
        };
        const access_token = createToken(userToReturn);
        res.status(200).json({ token: access_token, user: userToReturn });
      });
}
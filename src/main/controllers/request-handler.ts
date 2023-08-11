import { Application } from "express";
import { verifyToken } from "../utils/token.utils";

export function analyseNotAuthRequests(server: Application) {
    server.use(/^(?!\/auth).*$/, (req, res, next) => {
        console.log("got a query not auth");
        if (
          req.headers.authorization === undefined ||
          req.headers.authorization.split(" ")[0] !== "Bearer"
        ) {
          const status = 401;
          const message = "Bad authorization header";
          res.status(status).json({ status, message });
          return;
        }
        try {
          verifyToken(req.headers.authorization.split(" ")[1]);
          if (req.method === "POST") {
            req.body.createdAt = Date.now();
          }
          if (req.method === "PUT") {
            req.body.updatedAt = Date.now();
          }
          next();
        } catch (err) {
          const status = 401;
          const message = "Error: access_token is not valid";
          res.status(status).json({ status, message });
        }
      });
}
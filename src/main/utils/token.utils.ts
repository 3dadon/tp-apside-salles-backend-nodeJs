import { sign, verify } from "jsonwebtoken";
import { tokenConfig, expiresIn } from "../resources/config/app.config";



// Verify the token
export function verifyToken(token: string) {
    return verify(token, tokenConfig.SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
}

// Create a token from a payload
export function createToken(payload: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
}) {
    return sign(payload, tokenConfig.SECRET_KEY, {expiresIn});
}
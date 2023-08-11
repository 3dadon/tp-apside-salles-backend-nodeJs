import { userdb } from "../resources/config/app.config";
import { User } from "../models/user.model";


// Check if the user exists in database
export function isAuthenticated(email: string, password: string) {
    return userdb.users.find(
      (user: User) => user.email === email && user.password === password
    );
  }
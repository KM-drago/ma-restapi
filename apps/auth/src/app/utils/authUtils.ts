import {User} from "../schemas/user.schema";
import {createHash} from "crypto";

export function generateToken(user: User): string {
  const base64edTokenBody = Buffer.from(JSON.stringify({
    email: user.email,
    role: user.role,
  })).toString('base64');
  const hashTail = createHash('sha256')
    .update(base64edTokenBody + process.env["jwtKey"])
    .digest('hex');
  return `${base64edTokenBody}.${hashTail}`;
}

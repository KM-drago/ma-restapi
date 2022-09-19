import {User} from "../schemas/user.schema";
import {createHash} from "crypto";

export function generateToken(user: User): string {
  const base64edTokenBody = Buffer.from(JSON.stringify(user)).toString('base64');
  return Buffer.from(
    base64edTokenBody
    + '.'
    + createHash('sha256').update(base64edTokenBody + process.env["jwtKey"]).digest()
  ).toString('base64');
}

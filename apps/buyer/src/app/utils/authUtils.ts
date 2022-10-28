import { createHash } from "crypto";
import { UnauthorizedException } from "@nestjs/common";

export function ensureAccessOrThrow(token: string, acceptedRoles: string[]) {
  const destructuredToken = token.split('.');
  const nowGeneratedHash = createHash('sha256')
    .update(destructuredToken[0] + process.env["jwtKey"])
    .digest('hex');
  if (nowGeneratedHash != destructuredToken[1]) throw new UnauthorizedException();
  const tokenBody: {
    email: string,
    role: string,
  } = JSON.parse(Buffer.from(destructuredToken[0], 'base64')
    .toString('ascii'));
  if (!acceptedRoles.includes(tokenBody.role)) throw new UnauthorizedException();
}

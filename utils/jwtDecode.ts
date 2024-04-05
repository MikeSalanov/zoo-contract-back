import { JwtDecodedType } from "../types/jwtDecoded.type";

function parseJwt(token: string): JwtDecodedType {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default parseJwt;

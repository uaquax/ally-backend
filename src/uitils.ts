import * as bcrypt from "bcrypt";

export async function encode(plain: string) {
  const sRr = 10;

  return await bcrypt.hash(plain, sRr);
}

export async function compare(string: string, hash: string) {
  return await bcrypt.compare(string, hash);
}

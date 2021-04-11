import hasha from "hasha";
import {
  create,
  read,
  update,
  del,
  UserData,
  getAll,
  getByEmail,
  find,
  getById,
} from "../helpers/user";
import jwt from "jsonwebtoken";
import config from "../config";

import { CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";
import { sendCode } from "./mail";
import User from "../database/models/user";

const cache = new CacheContainer(new MemoryStorage());

/**
 * User Login
 * @param data User Data
 */
async function login(data: UserData): Promise<string> {
  data.password = hasha(data.password);
  const user = await read(data);
  if (!user.registered) throw new Error("Verify your email");
  return user
    ? "Bearer " + jwt.sign({ id: user.id }, config.secretKey)
    : undefined;
}

/**
 * User Register
 * @param data User Data
 */
async function register(
  data: UserData,
  role: string = undefined
): Promise<void> {
  if (role) await create(data, { role: role });
  else await create(data);
}

async function confirmCode(user: User) {
  const code = makeCode(4);
  await cache.setItem(`confirm-${user.id}`, code, { ttl: 60 * 60 });
  await sendCode(user, code);
}

async function verifyCode(user: User, code: string) {
  const cachedCode = await cache.getItem(`confirm-${user.id}`);
  if (!cachedCode) throw new Error("Code doesn't exist or expired");
  if (cachedCode !== code) throw new Error("Bad code");
  await user.update({ registered: true });
}

function makeCode(length: number) {
  const result = [];
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export { login, register, verifyCode, confirmCode, getByEmail, find, getById };

export default {
  login,
  register,
  update,
  del,
  read,
  getAll,
  verifyCode,
  confirmCode,
  getByEmail,
  find,
  getById,
};

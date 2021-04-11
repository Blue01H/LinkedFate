import { Op } from "sequelize";
import database from "../database";
import Role from "../database/models/role";

const { User } = database.models;

interface UserData {
  email: string;
  password: string;
  names: string;
  surnames: string;
  phone: string;
  registered: boolean;
}

interface UserOptions {
  role: string;
}

interface UserTarget {
  id?: number;
  email?: string;
  password?: string;
}

/**
 * Create a user in the database
 * @param data User Data
 * @param options User Options
 */
async function create(data: UserData, options: UserOptions = undefined) {
  const user = await User.create(data);
  if (options) {
    await user.setRole(options.role);
  } else {
    await user.setRole("user");
  }
}

/**
 * Get info of user in the database
 * @param target User Target
 */
async function read(target: UserTarget) {
  const user = await User.findOne({ where: { ...target } });
  const role = await user.getRole();
  return {
    id: user.id,
    email: user.email,
    role: role,
    phone: user.phone,
    names: user.names,
    surnames: user.surnames,
    registered: user.registered,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function getAll() {
  const users = await User.findAll();
  return users;
}

async function getByEmail(email: string) {
  const user = await User.findOne({ where: { email: email } });
  return user;
}

async function getById(id: number) {
  const user = await User.findOne({ where: { id: id } });
  return user;
}

async function find(search: string) {
  const users = await User.findAll({
    where: {
      [Op.or]: {
        email: {
          [Op.substring]: search,
        },
        names: {
          [Op.substring]: search,
        },
        surnames: {
          [Op.substring]: search,
        },
      },
    },
    include: {
      model: Role,
    },
  });
  return users;
}

/**
 * Updates user in the database
 * @param data User Data
 * @param target User Target
 * @param options User Options
 */
async function update(
  data: UserData,
  target: UserTarget,
  options: UserOptions = undefined
) {
  const user = await User.findOne({ where: { ...target } });
  if (user) {
    await user.update(data);
    if (options) {
      await user.setRole(options.role);
    }
  }
}

/**
 * Deletes user in the database
 * @param target User Target
 */
async function del(target: UserTarget) {
  await User.destroy({ where: { ...target } });
}

export {
  UserData,
  UserOptions,
  UserTarget,
  create,
  read,
  update,
  del,
  getAll,
  getByEmail,
  find,
  getById,
};

export default { create, read, update, del, getAll, getByEmail, find, getById };

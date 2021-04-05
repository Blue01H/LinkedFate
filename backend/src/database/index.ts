import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import Role from "./models/role";
import User from "./models/user";
import Follow from "./models/follow";
import Post from "./models/post";

import config from "../config";

const env = process.env.NODE_ENV || "development";

const databaseConfig: SequelizeOptions = config.database[env];

/**
 * Sync database
 */
async function createDatabase() {
  const database = getDatabase();
  await database.sequelize.sync({ force: true });
  return database;
}

/**
 * Get database object
 * @returns {Array[Sequelize, Models]}
 */
function getDatabase() {
  const models = [Role, User, Follow, Post];
  const sequelize = new Sequelize(databaseConfig);
  sequelize.addModels(models);
  return {
    sequelize: sequelize,
    models: {
      Role: Role,
      User: User,
      Follow: Follow,
      Post: Post,
    },
  };
}

export { createDatabase, getDatabase };
export default getDatabase();

import database from "../database";

const { Follow } = database.models;

async function follow(userId: number, usersId: number[]) {
  for (const user of usersId) {
    await Follow.create({ userId: userId, followId: user });
  }
}

async function unfollow(userId: number, usersId: number[]) {
  await Follow.destroy({
    where: {
      followId: usersId,
      userId: userId,
    },
  });
}

async function getFollowers(userId: number) {
  return await Follow.findAll({
    where: {
      userId: userId,
    },
  });
}

async function getFollows(userId: number) {
  return await Follow.findAll({
    where: {
      followId: userId,
    },
  });
}

async function getSuggestions(userId: number) {
  const followers = await Follow.findAll({ where: { userId: userId } });
  const suggestions = await Follow.findAll({
    where: {
      userId: followers.map((follower) => follower.id),
    },
  });
  return suggestions;
}

export { unfollow, getSuggestions, follow, getFollowers, getFollows };
export default { unfollow, getSuggestions, follow, getFollows, getFollowers };

import database from "../database";

const { Post, User, Role } = database.models;

async function createPost(userId: number, content: string) {
  return await Post.create({ userId: userId, content: content });
}

async function deletePost(userId: number, postId: number) {
  await Post.destroy({ where: { userId: userId, id: postId } });
}

async function getPostsByUser(page: number, limit: number, byUser: number) {
  const offset = page * limit;
  return await Post.findAndCountAll({
    offset: offset,
    limit: limit,
    where: { userId: byUser },
    include: {
      model: User,
    },
    order: [["id", "DESC"]],
  });
}

async function getPosts(userId: number, page: number, limit: number) {
  const companyRol = await Role.findOne({ where: { name: "business" } });
  const employeeRol = await Role.findOne({ where: { name: "employee" } });
  if (companyRol && employeeRol) {
    const companyRolId = companyRol.id;
    const employeeRolId = employeeRol.id;
    const user = await User.findOne({ where: { id: userId } });
    if (user.rolId == employeeRolId) {
      const offset = page * limit;
      return await Post.findAndCountAll({
        offset: offset,
        limit: limit,
        include: {
          model: User,
          where: { rolId: companyRolId },
        },
        order: [["id", "DESC"]],
      });
    } else if (user.rolId == companyRolId) {
      const offset = page * limit;
      return await Post.findAndCountAll({
        offset: offset,
        limit: limit,
        include: {
          model: User,
          where: { rolId: employeeRolId },
        },
        order: [["id", "DESC"]],
      });
    }
    throw new Error("User isn't employee or business");
  } else throw new Error("No business rol or employee rol");
}

export { deletePost, getPosts, createPost, getPostsByUser };
export default { deletePost, getPosts, createPost, getPostsByUser };

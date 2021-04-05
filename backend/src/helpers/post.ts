import database from "../database";

const { Post, User, Role } = database.models;

async function createPost(userId: number, content: string) {
  return await Post.create({ userId: userId, content: content });
}

async function deletePost(userId: number, postId: number) {
  await Post.destroy({ where: { userId: userId, id: postId } });
}

async function getPosts(userId: number, page: number, limit: number) {
  const companyRol = await Role.findOne({ where: { name: "company" } });
  const employeeRol = await Role.findOne({ where: { name: "employee" } });
  if (companyRol && employeeRol) {
    const companyRolId = companyRol.id;
    const employeeRolId = employeeRol.id;
    const user = await User.findOne({ where: { id: userId } });
    if (user.role == employeeRolId) {
      const offset = page * limit;
      return await User.findAndCountAll({
        offset: offset,
        limit: limit,
        include: { model: User, where: { rolId: companyRolId } },
        order: [["id", "DESC"]],
      });
    } else if (user.role == companyRolId) {
      const offset = page * limit;
      return await User.findAndCountAll({
        offset: offset,
        limit: limit,
        include: { model: User, where: { rolId: employeeRolId } },
        order: [["id", "DESC"]],
      });
    }
    throw "User isn't employee or compane";
  } else throw "No company rol or employee rol";
}

export { deletePost, getPosts, createPost };
export default { deletePost, getPosts, createPost };

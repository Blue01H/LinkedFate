import passport from "passport";
import express, { Request } from "express";

import User from "../controllers/user";
import Post from "../helpers/post";
import Follow from "../helpers/follow";
import { sendJobRequest, sendWorkRequest } from "../controllers/mail";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

interface UserRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

router.post("/login", async (req, res) => {
  try {
    const token = await User.login(req.body);
    res.status(200).send(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/confirm", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) throw new Error("No email and code");
    const user = await User.getByEmail(email as string);
    await User.verifyCode(user, code as string);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/confirm", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) throw new Error("No email");
    const user = await User.getByEmail(email as string);
    await User.confirmCode(user);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/request", auth, async (req: UserRequest, res) => {
  try {
    const { id } = req.query;
    const from = await User.getById(req.user.id);
    const to = await User.getById(parseInt(id as string));
    const role = await from.getRole();
    if (role === "employee") {
      await sendWorkRequest(from, to);
    } else {
      await sendJobRequest(from, to);
    }
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/all", auth, async (req: UserRequest, res) => {
  try {
    if (req.user.role == "admin") {
      const users = await User.getAll();
      res.status(200).send(users);
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/search", auth, async (req: UserRequest, res) => {
  try {
    const { search, id } = req.query;
    if (search) {
      const users = await User.find(search as string);
      res.status(200).send(users);
    }
    if (id) {
      const user = await User.getById(parseInt(id as string));
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/user", async (req, res) => {
  try {
    const { role } = req.body;
    if (role) {
      delete req.body.role;
    }
    await User.register(req.body, role);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user", auth, async (req: UserRequest, res) => {
  try {
    const user = await User.read({ id: req.user.id });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/user", auth, async (req: UserRequest, res) => {
  try {
    await User.update(req.body, { id: req.user.id });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/user", auth, async (req: UserRequest, res) => {
  try {
    await User.del({ id: req.user.id });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/post", auth, async (req: UserRequest, res) => {
  try {
    const { content } = req.body;
    const post = await Post.createPost(req.user.id, content);
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/post", auth, async (req: UserRequest, res) => {
  try {
    const getNumber = (param: unknown, def: string = "") => {
      const number =
        def === ""
          ? parseInt(param as string)
          : parseInt((param || def) as string);
      return number;
    };
    const { limit, page, userId } = req.query;
    if (userId) {
      const posts = await Post.getPostsByUser(
        getNumber(page, "0"),
        getNumber(limit, "5"),
        getNumber(userId)
      );
      res.status(200).send(posts);
    } else {
      const posts = await Post.getPosts(
        req.user.id,
        getNumber(page, "0"),
        getNumber(limit, "5")
      );
      res.status(200).send(posts);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.delete("/post", auth, async (req: UserRequest, res) => {
  try {
    const { id } = req.query;
    const queryId = parseInt(id as string);
    if (!Number.isNaN(queryId)) {
      await Post.deletePost(req.user.id, queryId);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/follow", auth, async (req: UserRequest, res) => {
  try {
    const { usersId } = req.body;
    await Follow.follow(req.user.id, usersId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/follow", auth, async (req: UserRequest, res) => {
  try {
    const follows = await Follow.getFollows(req.user.id);
    res.status(200).send(follows);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/follower", auth, async (req: UserRequest, res) => {
  try {
    const followers = await Follow.getFollowers(req.user.id);
    res.status(200).send(followers);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/follow", auth, async (req: UserRequest, res) => {
  try {
    const { usersId } = req.body;
    await Follow.unfollow(req.user.id, usersId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;

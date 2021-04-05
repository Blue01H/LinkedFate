import passport from "passport";
import express, { Request } from "express";

import User from "../controllers/user";
import Post from "../helpers/post";
import Follow from "../helpers/follow";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

interface UserRequest extends Request {
  user: {
    id: number;
    username: string;
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

router.post("/user", async (req, res) => {
  try {
    const token = await User.register(req.body);
    res.status(200).send(token);
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

router.post("/post", async (req: UserRequest, res) => {
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
    const limit = parseInt((req.query.limit || "5") as string);
    const page = parseInt((req.query.page || "1") as string);
    const posts = await Post.getPosts(req.user.id, page, limit);
    res.status(200).send(posts);
  } catch (e) {
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

router.post("/follow", async (req: UserRequest, res) => {
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

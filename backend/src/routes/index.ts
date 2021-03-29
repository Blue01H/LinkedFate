import passport from "passport";
import express, { Request } from "express";

import User from "../controllers/user";

const router = express.Router();

const auth = passport.authenticate('jwt', {session: false});

interface UserRequest extends Request{
    user: {
        id: number,
        username: string,
        role: string,
        createdAt: string,
        updatedAt: string
    }
}

router.post('/login', async (req, res) => { 
    try{
        const token = await User.login(req.body);
        res.status(200).send(token);
    }catch(e){
        res.status(500).send(e.message);
    }
})

router.get('/user/all', auth, async (req: UserRequest, res) => {
    try{
        if(req.user.role == "admin"){
            const users = await User.getAll();
            res.status(200).send(users);
        }else{
            res.sendStatus(403);
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})

router.post('/user', async (req, res) => {
    try{
        const token = await User.register(req.body);
        res.status(200).send(token);
    }catch(e){
        res.status(500).send(e.message);
    }
});

router.get('/user', auth, async (req: UserRequest, res) => {
    try{
        const user = await User.read({ id: req.user.id })
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e.message);   
    }
})

router.put('/user', auth, async (req: UserRequest, res) => {
    try{
        await User.update(req.body, {id: req.user.id});
        res.sendStatus(200);
    }catch(e){
        res.status(500).send(e.message);
    }
})

router.delete('/user', auth, async (req: UserRequest, res) => {
    try{
        await User.del({ id: req.user.id });
        res.sendStatus(200);
    }catch(e){
        res.status(500).send(e.message);
    }
})

export default router;
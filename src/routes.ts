import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.get('/', (req, res) => {
  return res.send('GET found!');
});

router.post('/users', createUserController.handle);
router.post('/tags', createTagController.handle);

export { router }

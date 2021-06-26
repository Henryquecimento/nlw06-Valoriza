import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();

router.use(ensureAdmin);

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin, 
  createTagController.handle
);
router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post(
  '/compliments', 
  ensureAuthenticated, 
  createComplimentController.handle
);

router.get(
  '/users/compliments/send', 
  ensureAuthenticated, 
  listUserSenderComplimentsController.handle);
router.get(
  '/users/compliments/receive', 
  ensureAuthenticated, 
  listUserReceiverComplimentsController.handle);

export { router }

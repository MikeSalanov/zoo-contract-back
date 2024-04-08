import { Router } from 'express';
import uploadRoute from './adminAccount/upload.route';
import signInRoute from './auth/signIn.route';
import signUpRoute from "./auth/signUp.route";
import signOutRoute from "./auth/signOut.route";
import bindImageRoute from "./adminAccount/bindImage.route";
import getAnimalsRoute from "./common/getAnimals.route";
import animalsRoute from "./adminAccount/animals.route";
import tariffsRoute from "./common/tariffs.route";
const router: Router = Router();

router.use('/', signInRoute, signUpRoute, signOutRoute, getAnimalsRoute, tariffsRoute);
router.use('/admin-account', uploadRoute, bindImageRoute, animalsRoute);

export default router;

import { Router } from 'express';
import uploadRouter from './adminAccount/upload.route';
import signInRoute from './auth/signIn.route';
import signUpRoute from "./auth/signUp.route";
import signOutRoute from "./auth/signOut.route";
const router: Router = Router();

router.use('/', signInRoute, signUpRoute, signOutRoute);
router.use('/admin-account', uploadRouter);

export default router;

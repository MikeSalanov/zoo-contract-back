import { Router } from 'express';
import uploadRouter from './adminAccount/upload';
const router: Router = Router();

router.use('/admin-account', uploadRouter);

export default router;

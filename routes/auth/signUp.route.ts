import { Router, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import validateRegisterMiddleware from '../../middlewares/validateRegister.middleware';
import hashingPassword from '../../utils/hashingPassword';
import RequestExpressWithAdminType from '../../types/requestExpressWithAdmin.type';
import {Admin} from "../../classes/Admin";

const router = Router();

router.route('/signUp').post(
  validateRegisterMiddleware,
  async (req: RequestExpressWithAdminType, res: Response) => {
    const validationErrors: Result<ValidationError> = validationResult(req);
    if (!validationErrors.isEmpty()) {
      switch (validationErrors.array()[0].msg) {
        case 'User already exists':
          return res.status(409).json({ message: validationErrors.array()[0].msg });
        case 'Password doesn\'t match with confirm_password field':
          return res.status(400).json({ message: validationErrors.array()[0].msg });
        default:
          return res.status(400).json({ message: 'Invalid request' });
      }
    }
    const hashedPassword: string = await hashingPassword(req.body.password);
    if (req.adminLogin) await new Admin(req.adminLogin).toRegister(hashedPassword);
    return res.status(201).json({ message: 'Successfully created user' });
  }
);

export default router;

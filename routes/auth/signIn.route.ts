import { Result, ValidationError, validationResult } from "express-validator";
import { Router, Response } from 'express';
import { releaseTokens } from '../../utils/releaseTokens';
import validateAuthMiddleware from '../../middlewares/validateAuth.middleware';
import RequestExpressWithAdminType from '../../types/requestExpressWithAdmin.type';
import { Admin } from "../../classes/Admin";

const router: Router = Router();

router.route('/signIn').post(
  validateAuthMiddleware,
  async (req: RequestExpressWithAdminType, res: Response) => {
    const validationErrors: Result<ValidationError> = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ message: validationErrors.array()[0].msg });
    }
    if (!req.adminLogin) return res.status(401).json({ message: 'Unauthorized' });
    const { accessToken, refreshToken } = releaseTokens({ login: req.adminLogin });
    
    const admin: Admin = new Admin(req.adminLogin)
    await admin.addRefreshTokenToUser(refreshToken);
    
    if (req.cookies['refreshToken']) await admin.toMakeInvalidRefreshToken(req.cookies['refreshToken']);
    
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
    });
    
    return res.status(200)
      .json({ accessToken });
  },
);

export default router;

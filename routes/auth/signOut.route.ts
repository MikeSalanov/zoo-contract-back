import { Router, Response, Request } from 'express';
import { Admin } from "../../classes/Admin";
import { JwtDecodedType } from "../../types/jwtDecoded.type";
import jwtDecode from '../../utils/jwtDecode';

const router: Router = Router();

router.post('/signOut', async(req: Request, res: Response) => {
  if (!req.cookies['refreshToken']) return res.status(401).json({ message: 'Unauthorized' });
  const { login }: JwtDecodedType = jwtDecode(req.cookies['refreshToken']);
  await new Admin(login).toMakeInvalidRefreshToken(req.cookies['refreshToken']);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Successfully log out' });
});

export default router;

import { Router, Request, Response } from 'express';
import { Admin } from '../../classes/Admin';
import jwtDecode from "../../utils/jwtDecode";
import {ImageFromDBEntityType} from "../../types/imageFromDBEntity.type";
const router: Router = Router();

router.get('/images', async (req: Request, res: Response) => {
  try {
    const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
    const imagesFromDB: Array<ImageFromDBEntityType> = await admin.getAllImages();
    return res.status(200).json([...imagesFromDB]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong in endpoint /images' });
  }
});

export default router;

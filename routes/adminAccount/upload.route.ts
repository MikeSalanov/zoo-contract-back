import { Router, Request, Response } from 'express';
import multer, {Multer} from 'multer';
import { Admin } from '../../classes/Admin';
import jwtDecode from "../../utils/jwtDecode";
const router: Router = Router();
const upload: Multer = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if ('file' in req.body || !req.file) {
    return res.status(400).send('Invalid request data');
  }
  try {
    const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
    const fileUrl: string = await admin.uploadFile(req.file);
    await admin.addImageToDataBase(fileUrl);
    
    return res.status(200).json({ fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong in /upload' });
  }
});

export default router;

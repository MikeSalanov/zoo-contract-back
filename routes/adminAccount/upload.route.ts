import { Router, Request, Response } from 'express';
import multer, {Multer} from 'multer';
import { Admin } from '../../classes/Admin';
const router: Router = Router();
const upload: Multer = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const fileUrl: string = await Admin.uploadFile(req.file);
    
    return res.status(200).json({ fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong in /upload' });
  }
});

export default router;

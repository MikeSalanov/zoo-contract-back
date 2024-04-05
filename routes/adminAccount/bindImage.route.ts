import { Router, Request, Response } from 'express';
import { Admin } from '../../classes/Admin';
import jwtDecode from "../../utils/jwtDecode";
const router: Router = Router();

router.patch('/bindImage/:idAnimal', async (req: Request, res: Response) => {
  try {
    if (!('imageUrl' in req.body) || Number.isNaN(Number(req.params['idAnimal']))) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
    
    const hasBinded = await admin.bindImageToAnimal(req.body.imageUrl, Number(req.params['idAnimal']));
    if (!hasBinded) return res.status(404).json({ message: 'Image not found in database' });
    
    return res.status(200).json({ message: 'Successfully binded' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in /bindImage/${req.params['idAnimal']}` });
  }
});

export default router;

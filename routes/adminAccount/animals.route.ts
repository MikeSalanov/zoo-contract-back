import { Router, Request, Response } from 'express';
import { Admin } from '../../classes/Admin';
import jwtDecode from "../../utils/jwtDecode";
const router: Router = Router();

router.post('/animals', async (req: Request, res: Response) => {
  try {
    if ('name' in req.body && 'description' in req.body) {
      const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
      const hasBeenCreated: boolean = await admin.createAnimal(req.body.name, req.body.description);
      console.log(hasBeenCreated);
      if (!hasBeenCreated) return res.status(500).json({ message: 'Something went wrong, when tried to create animal' });
      return res.status(201).json({ message: 'Animal has been successfully created' });
    }
    return res.status(400).json({ message: 'Invalid data of request' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in creating /images/${req.params['idAnimal']}` });
  }
})
.patch('/animals/:animalId', async (req: Request, res: Response) => {
  try {
    const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
    
    if (req.params['animalId'] && Number.isNaN(Number(req.params['animalId']))) {
      return res.status(404).json({ message: `Animal with id ${req.query['animalId']} not found` });
    } else if (req.params['animalId'] && ('name' in req.body || 'description' in req.body)) {
      const hasBeenEdited: boolean = await admin.editAnimal(Number(req.params['animalId']), req.body);
      if (!hasBeenEdited) return res.status(404).json({ message: 'Editable animal not found' });
      return res.status(200).json({ message: 'Successfully edited' });
    } else {
      return res.status(400).json({ message: 'Invalid request data' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in /bindImage/${req.params['idAnimal']}` });
  }
})
.delete('/animals/:animalId', async (req: Request, res: Response) => {
  try {
    const admin: Admin = new Admin(jwtDecode(req.cookies['refreshToken']).login);
    
    if (req.params['animalId'] && Number.isNaN(Number(req.params['animalId']))) {
      return res.status(404).json({ message: `Animal with id ${req.query['animalId']} not found` });
    } else if (req.params['animalId']) {
      const hasBeenRemoved: boolean = await admin.removeAnimal(Number(req.params['animalId']));
      if (!hasBeenRemoved) return res.status(404).json({ message: 'Removable animal not found' });
      return res.status(200).json({ message: 'Successfully edited' });
    } else {
      return res.status(400).json({ message: 'Invalid request data' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in /bindImage/${req.params['idAnimal']}` });
  }
});

export default router;

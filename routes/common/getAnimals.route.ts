import { Router, Request, Response } from 'express';
import { Admin } from '../../classes/Admin';
import {ParsedDataOfAnimalsFromDBType} from "../../types/parsedDataOfAnimalsFromDB.type";
const router: Router = Router();

router.get('/animals', async (req: Request, res: Response) => {
  try {
    if (req.query['animalId'] && Number.isNaN(Number(req.query['animalId']))) {
      return res.status(404).json({ message: `Animal with id ${req.query['animalId']} not found` });
    } else if (req.query['animalId'] && !Number.isNaN(Number(req.query['animalId']))) {
      const animals: Array<ParsedDataOfAnimalsFromDBType> = await Admin.findAnimals(Number(req.query['animalId']));
      return res.status(200).json({ animals: [] });
    } else {
      const animals: Array<ParsedDataOfAnimalsFromDBType> = await Admin.findAnimals(null);
      return res.status(200).json({ animals });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in /bindImage/${req.params['idAnimal']}` });
  }
})

export default router;

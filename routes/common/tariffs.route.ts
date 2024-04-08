import { Router, Request, Response } from 'express';
import { Admin } from '../../classes/Admin';
import {ParsedDataOfAnimalsFromDBType} from "../../types/parsedDataOfAnimalsFromDB.type";
import {Tariff} from "../../types/tariff.type";
const router: Router = Router();

router.get('/tariffs', async (req: Request, res: Response) => {
  try {
    const allTariffs: Array<Tariff> = await Admin.getAllTariffs();
    return res.status(200).json({ tariffs: allTariffs });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Something went wrong in /bindImage/${req.params['idAnimal']}` });
  }
})

export default router;

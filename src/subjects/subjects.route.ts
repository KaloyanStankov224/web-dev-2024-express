import express, { Request, Response } from 'express';
import { db } from '../database';
import { Subject } from './subjects';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try{
        const {name} = req.body
        if (await db.models.Subject.findOne({ where: { name } })) {
            throw new Error("Subject already exists.")
          }
        db.models.Subject.create({name})
        res.json(db.models.Subject.findAll)
    }catch(error: any){
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (_req: Request, res: Response) => {
    try {
      const subjects = await db.models.Subject.findAll();
      res.status(200).json(subjects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  export default router;
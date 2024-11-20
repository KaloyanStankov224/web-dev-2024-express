import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjects } = req.body;
    const university = await db.models.University.findByPk(universityId); 

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }
    
    const user = await db.models.User.create({ name, email, universityId });
    const subjectsFromDB = await db.models.Subject.findAll({
      where: { id: subjects },
    })
    await user.setSubjects(subjectsFromDB)
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: [{
        model: db.models.University,
        as: 'university',
      },
      {
        model: db.models.Subject,
        as: 'subjects',
      }]
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/subjects', async (req, res) => {
  try{
  const userId = parseInt(req.body.userId);
  const subjectsIds = req.body.subjects;
  const user = await db.models.User.findOne({where: {id: userId}})
  const subjects = await  db.models.Subject.findAll({where: {id: subjectsIds}})
  user?.setSubjects(subjects);
  await db.models.User.update(user!!, {where: {id: userId}})
  res.status(200).json(await db.models.User.findOne(
    {
      where: {id: userId},
      include: [
        {
          model: db.models.University,
          as: 'university',
        },
        {
          model: db.models.Subject,
          as: 'subjects',
        }
    ]},
    ))
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
})

export default router;

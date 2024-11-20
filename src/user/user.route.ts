import { Router } from 'express';
import { db } from '../database';
import { Where } from 'sequelize/types/utils';

const userRouter = Router();

let universities = [
  {id: 1, name: "TU"},
  {id: 2, name: "SU"}
]

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', university: universities[0], subjects: ['maths', 'IT', 'bio'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', university: universities[1], subjects: ['maths', 'IT', 'bio'] },
];

userRouter.get('/', (req, res) => {
  res.json(db.models.User.findAll);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    university: req.body.university,
    subjects: req.body.subjects
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      university: req.body.university,
      subjects: req.body.subjects
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch(['/updateUniversity'], (req, res) => {
  const universityId = parseInt(req.body.universityId)
  const universityIndex = universities.findIndex((u) => u.id === universityId)
  const userId = parseInt(req.body.userId);
  const userIndex = users.findIndex((u) => u.id === userId);
  if(universityIndex === -1) {
    res.status(404).json({ message: 'University not found' });
  }
  if(userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  }
  users[userIndex].university = universities[universityIndex]
  res.json(users[userIndex])
})

userRouter.patch('/updateSubjects', (req, res) => {
  const userId = parseInt(req.body.userId);
  const userIndex = users.findIndex((u) => u.id === userId);
  if(userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  }
  users[userIndex].subjects = req.body.subjects
  res.json(users[userIndex])
})

userRouter.put('/subjects', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const subjectsIds = req.body.subjects;
  const user = await db.models.User.findOne({where: {id: userId}})
  const subjects = await  db.models.Subject.findAll({where: {id: subjectsIds}})
  user?.setSubjects(subjects);
  await db.models.User.update(user!!, {where: {id: userId}})
})

export default userRouter;

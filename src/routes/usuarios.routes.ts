import { Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hashed = await bcrypt.hash(password, 10);

  console.log('PLAIN:', password);
  console.log('HASHED:', hashed);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed, 
    },
  });

  res.json(user);
});

export default router;

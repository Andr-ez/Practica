import { Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/',authMiddleware, authorizeRole(["ADMIN"]), async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


router.post('/', authMiddleware, authorizeRole(["ADMIN"]), async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hashed = await bcrypt.hash(password, 10);

  //temporal mientras depuramos
  console.log('PLAIN:', password);
  console.log('HASHED:', hashed);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: role || "USER",
    },
  });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    message: "Usuario creado correctamente",
  });

});

export default router;

import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import prisma from '../lib/prisma';



const router = Router();

interface Usuario {
  id: number;
  nombre: string;
}

const usuarios: Usuario[] = [
  { id: 1, nombre: "Andrés" },
  { id: 2, nombre: "Laura" }
];

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});



router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: { name, email, password }
  });

  res.json(user);
});




router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { name, email }
  });

  res.json(user);
});


router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: { id }
  });

  res.json({ message: 'Usuario eliminado' });
});

export default router;
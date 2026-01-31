import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// usuario fake por ahora
const users = [
  { id: 1, email: "admin@test.com", password: "123456" }
];

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "SECRETO_SUPER",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;

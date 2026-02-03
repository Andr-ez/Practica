import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  id: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "SECRETO_SUPER";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ mensaje: "Token requerido" });
  }

  const token = header.split(" ")[1];

  console.log("JWT_SECRET usado en middleware:", JWT_SECRET);
  console.log("Header recibido:", req.headers.authorization);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
}
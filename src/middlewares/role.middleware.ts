import { Request, Response, NextFunction } from "express";

export function authorizeRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

console.log("Rol recibido en middleware:", user.role);
console.log("Roles permitidos:", roles);

    const roleNormalized = user.role?.trim().toUpperCase();
    if (!roleNormalized || !roles.includes(roleNormalized)) {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    next();
  };
}

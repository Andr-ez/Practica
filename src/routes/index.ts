
import { Router } from "express";
import authRoutes from "./auth.routes";
import usuariosRoutes from "./usuarios.routes";
import perfilRoutes from "./perfil.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/", perfilRoutes); 

export default router;